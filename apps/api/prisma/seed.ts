import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const securePassword = async (password: string) => bcrypt.hash(password, 12);

async function main() {
  const passwordHash = await securePassword('ChangeMe!123');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tournax.gg' },
    update: {},
    create: {
      email: 'admin@tournax.gg',
      passwordHash,
      role: UserRole.ADMIN
    }
  });

  const games = [
    {
      name: 'Valorant',
      slug: 'valorant',
      logoUrl: 'https://cdn.example.com/logos/valorant.svg'
    },
    {
      name: 'Apex Legends',
      slug: 'apex-legends',
      logoUrl: 'https://cdn.example.com/logos/apex.svg'
    },
    {
      name: 'Fortnite',
      slug: 'fortnite',
      logoUrl: 'https://cdn.example.com/logos/fortnite.svg'
    }
  ];

  await Promise.all(
    games.map(game =>
      prisma.game.upsert({
        where: { slug: game.slug },
        update: {},
        create: game
      })
    )
  );

  console.info('Seed completed', { adminId: admin.id });
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
