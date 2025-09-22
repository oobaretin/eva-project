import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'braidsbyeva@gmail.com' },
    update: {},
    create: {
      email: 'braidsbyeva@gmail.com',
      firstName: 'Awa',
      lastName: 'Obaretin',
      phone: '8322079386',
      hairType: 'Admin',
      isAdmin: true
    }
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample services
  const services = [
    {
      name: 'Small Knotless Box Braids',
      description: 'Beautiful small knotless box braids that promote healthy hair growth. Perfect for a protective style that lasts 6-8 weeks.',
      duration: 300, // 5 hours
      basePrice: 180.00,
      category: 'Box Braids',
      imageUrl: '/images/services/small-box-braids.jpg'
    },
    {
      name: 'Medium Knotless Box Braids',
      description: 'Medium-sized knotless box braids for a versatile look. Great for both casual and formal occasions.',
      duration: 360, // 6 hours
      basePrice: 220.00,
      category: 'Box Braids',
      imageUrl: '/images/services/medium-box-braids.jpg'
    },
    {
      name: 'Large Knotless Box Braids',
      description: 'Bold and beautiful large knotless box braids. A statement style that\'s easy to maintain.',
      duration: 420, // 7 hours
      basePrice: 280.00,
      category: 'Box Braids',
      imageUrl: '/images/services/large-box-braids.jpg'
    },
    {
      name: 'Feed-in Cornrows',
      description: 'Classic feed-in cornrows with a modern twist. Sleek and sophisticated styling.',
      duration: 180, // 3 hours
      basePrice: 120.00,
      category: 'Cornrows',
      imageUrl: '/images/services/feed-in-cornrows.jpg'
    },
    {
      name: 'Passion Twists',
      description: 'Trendy passion twists that give you a bohemian, carefree look. Perfect for any season.',
      duration: 240, // 4 hours
      basePrice: 160.00,
      category: 'Twists',
      imageUrl: '/images/services/passion-twists.jpg'
    },
    {
      name: 'Goddess Braids',
      description: 'Elegant goddess braids that make you feel like royalty. Perfect for special occasions.',
      duration: 300, // 5 hours
      basePrice: 200.00,
      category: 'Goddess Braids',
      imageUrl: '/images/services/goddess-braids.jpg'
    },
    {
      name: 'Kids Box Braids',
      description: 'Gentle and comfortable box braids designed specifically for children. Fun colors available.',
      duration: 180, // 3 hours
      basePrice: 100.00,
      category: 'Kids Styles',
      imageUrl: '/images/services/kids-box-braids.jpg'
    },
    {
      name: 'Braids Touch-up',
      description: 'Maintenance service to keep your braids looking fresh. Includes edge touch-up and styling.',
      duration: 60, // 1 hour
      basePrice: 50.00,
      category: 'Maintenance',
      imageUrl: '/images/services/braids-touchup.jpg'
    }
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service
    });
  }

  console.log('✅ Services created:', services.length);

  // Create availability schedule (Monday to Saturday, 9 AM to 6 PM)
  const availability = [
    { dayOfWeek: 1, startTime: '09:00', endTime: '18:00' }, // Monday
    { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' }, // Tuesday
    { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' }, // Wednesday
    { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' }, // Thursday
    { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' }, // Friday
    { dayOfWeek: 6, startTime: '09:00', endTime: '16:00' }, // Saturday
    { dayOfWeek: 0, startTime: '10:00', endTime: '15:00' }  // Sunday (limited hours)
  ];

  for (const avail of availability) {
    await prisma.availability.create({
      data: avail
    });
  }

  console.log('✅ Availability schedule created');

  // Create sample gallery items
  const galleryItems = [
    {
      title: 'Small Box Braids - Natural',
      description: 'Beautiful small knotless box braids in natural black',
      imageUrl: '/images/gallery/small-box-braids-natural.jpg',
      category: 'Box Braids'
    },
    {
      title: 'Medium Box Braids - Blonde Highlights',
      description: 'Medium box braids with blonde highlights for a trendy look',
      imageUrl: '/images/gallery/medium-box-braids-blonde.jpg',
      category: 'Box Braids'
    },
    {
      title: 'Passion Twists - Brown',
      description: 'Elegant passion twists in rich brown color',
      imageUrl: '/images/gallery/passion-twists-brown.jpg',
      category: 'Twists'
    },
    {
      title: 'Goddess Braids - Updo',
      description: 'Sophisticated goddess braids styled in an elegant updo',
      imageUrl: '/images/gallery/goddess-braids-updo.jpg',
      category: 'Goddess Braids'
    },
    {
      title: 'Feed-in Cornrows - Side Part',
      description: 'Clean feed-in cornrows with a stylish side part',
      imageUrl: '/images/gallery/feed-in-cornrows-side.jpg',
      category: 'Cornrows'
    },
    {
      title: 'Kids Box Braids - Colorful',
      description: 'Fun and colorful box braids perfect for kids',
      imageUrl: '/images/gallery/kids-box-braids-colorful.jpg',
      category: 'Kids Styles'
    }
  ];

  for (const item of galleryItems) {
    await prisma.gallery.create({
      data: item
    });
  }

  console.log('✅ Gallery items created:', galleryItems.length);

  // Create sample reviews
  const reviews = [
    {
      userId: adminUser.id, // Using admin user as placeholder
      rating: 5,
      comment: 'Awa is absolutely amazing! My braids look perfect and she was so gentle with my hair. I will definitely be back!',
      isVisible: true
    },
    {
      userId: adminUser.id,
      rating: 5,
      comment: 'Professional service and beautiful results. Awa really knows what she\'s doing. Highly recommend!',
      isVisible: true
    },
    {
      userId: adminUser.id,
      rating: 5,
      comment: 'Best braiding experience I\'ve ever had. Awa is patient, skilled, and the salon is clean and comfortable.',
      isVisible: true
    }
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review
    });
  }

  console.log('✅ Sample reviews created:', reviews.length);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
