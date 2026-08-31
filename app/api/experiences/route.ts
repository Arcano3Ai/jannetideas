import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type,
      title,
      subtitle,
      senderName,
      recipientName,
      coverUrl,
      theme = 'minimalist',
      targetDate,
      settings,
      items = [],
    } = body;

    if (!type || !title || !senderName || !recipientName) {
      logger.warn('Creation failed due to missing required fields', { body });
      return NextResponse.json(
        { error: 'Campos requeridos faltantes: tipo, título, remitente y destinatario son obligatorios.' },
        { status: 400 }
      );
    }

    // Generate secure unique token (12 random chars)
    const token = nanoid(12);

    const experience = await prisma.experience.create({
      data: {
        token,
        type,
        title,
        subtitle: subtitle || null,
        senderName,
        recipientName,
        coverUrl: coverUrl || null,
        theme,
        targetDate: targetDate ? new Date(targetDate) : null,
        settings: settings ? JSON.stringify(settings) : null,
        items: {
          create: items.map((item: any, index: number) => ({
            dayNumber: item.dayNumber ?? (type === 'ADVENT' ? index + 1 : null),
            title: item.title || null,
            content: item.content || null,
            mediaUrl: item.mediaUrl || null,
            mediaType: item.mediaType || 'TEXT',
            unlockDate: item.unlockDate ? new Date(item.unlockDate) : null,
            quizData: item.quizData ? JSON.stringify(item.quizData) : null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    logger.info('Experience created successfully', {
      experienceId: experience.id,
      token: experience.token,
      type: experience.type,
    });

    return NextResponse.json({
      success: true,
      token: experience.token,
      experienceId: experience.id,
    });
  } catch (error) {
    logger.error('Error creating experience', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al crear la experiencia.' },
      { status: 500 }
    );
  }
}
