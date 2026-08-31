import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 400 });
    }

    const experience = await prisma.experience.findUnique({
      where: { token },
      include: {
        items: {
          orderBy: { dayNumber: 'asc' },
        },
      },
    });

    if (!experience) {
      logger.warn('Experience not found for token', { token });
      return NextResponse.json(
        { error: 'Experiencia no encontrada o el enlace ha caducado.' },
        { status: 404 }
      );
    }

    const now = new Date();

    // Calculate lock status per item & experience
    let isCapsuleLocked = false;
    if (experience.type === 'TIME_CAPSULE' && experience.targetDate) {
      isCapsuleLocked = now < new Date(experience.targetDate);
    }

    const sanitizedItems = experience.items.map((item) => {
      let isItemLocked = false;

      if (experience.type === 'TIME_CAPSULE') {
        isItemLocked = isCapsuleLocked;
      } else if (experience.type === 'ADVENT') {
        // If specific item unlock date is set
        if (item.unlockDate) {
          isItemLocked = now < new Date(item.unlockDate);
        } else if (experience.targetDate && item.dayNumber) {
          // Calculate day date based on targetDate (start date) + dayNumber - 1
          const dayStartDate = new Date(experience.targetDate);
          dayStartDate.setDate(dayStartDate.getDate() + (item.dayNumber - 1));
          // Unlock at 00:00 of that day
          dayStartDate.setHours(0, 0, 0, 0);
          isItemLocked = now < dayStartDate;
        }
      }

      // If locked, omit secret text & media to prevent cheating in inspector
      return {
        id: item.id,
        dayNumber: item.dayNumber,
        title: isItemLocked ? `Día ${item.dayNumber}` : item.title,
        content: isItemLocked ? null : item.content,
        mediaUrl: isItemLocked ? null : item.mediaUrl,
        mediaType: item.mediaType,
        unlockDate: item.unlockDate || null,
        isLocked: isItemLocked,
        quizData: isItemLocked ? null : (item.quizData ? JSON.parse(item.quizData) : null),
      };
    });

    logger.info('Experience fetched successfully', {
      token,
      type: experience.type,
      itemCount: experience.items.length,
      isCapsuleLocked,
    });

    return NextResponse.json({
      id: experience.id,
      token: experience.token,
      type: experience.type,
      title: experience.title,
      subtitle: experience.subtitle,
      senderName: experience.senderName,
      recipientName: experience.recipientName,
      coverUrl: experience.coverUrl,
      theme: experience.theme,
      targetDate: experience.targetDate,
      settings: experience.settings ? JSON.parse(experience.settings) : null,
      isLocked: isCapsuleLocked,
      items: sanitizedItems,
      serverTime: now.toISOString(),
    });
  } catch (error) {
    logger.error('Error fetching experience by token', error);
    return NextResponse.json(
      { error: 'Error al obtener la experiencia' },
      { status: 500 }
    );
  }
}
