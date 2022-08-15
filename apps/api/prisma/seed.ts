import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const hnews = await prisma.hackerNewsFirst.create({
    data: {
      title: 'title',
      hnId: 1,
      upVotes: 1,
      url: 'https://www.jlee.biz',
    },
  });

  const contact = await prisma.contact.create({
    data: {
      name: 'james lee',
      email: 'uptownhr@gmail.com',
    },
  });

  console.log('created', [hnews, contact]);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
