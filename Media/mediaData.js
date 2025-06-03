// Media page dynamic content
const mediaData = {
  // Hero Section
  hero: {
    title: "Media & Press",
    subtitle: "Stay updated with our latest news and coverage",
    image: "/Images/youngcoach.jpg",
    imageAlt:
      "Dynamic media illustration showing press coverage and social media elements",
  },

  // Press Coverage Section
  pressCoverage: {
    title: "As Seen On",
    description:
      "Cymru Unleashed has been featured across Welsh and UK media outlets, bringing attention to our mission of empowering young Welsh women through sport and culture.",
    logos: [
      {
        src: "/Images/BBC_Cymru_Wales_2022.png",
        alt: "BBC Cymru Wales logo - Official media partner of Cymru Unleashed",
      },
      {
        src: "/Images/S4C_logo_2014.png",
        alt: "S4C logo - Welsh language broadcaster covering Cymru Unleashed",
      },
      {
        src: "/Images/klat.jpg",
        alt: "Klat Mag logo - Arts and culture magazine",
      },
      {
        src: "/Images/NativeRadio.png",
        alt: "Native Radio logo - Community radio station",
      },
      {
        src: "/Images/afrowales.jpeg",
        alt: "Afrowales logo - Community organization",
      },
      {
        src: "/Images/race-council-cymru-rcc-logo.png",
        alt: "Race Council Cymru logo - Community organization",
      },
    ],
  },

  // Stats Section
  stats: [
    {
      icon: "fa-newspaper",
      count: 50,
      label: "Media Features",
    },
    {
      icon: "fa-share-alt",
      count: 100,
      label: "Social Posts",
    },
    {
      icon: "fa-video",
      count: 25,
      label: "Video Stories",
    },
  ],

  // Latest News Section
  latestNews: {
    title: "Latest News",
    articles: [
      {
        image: "/Images/sportworkshop.jpg",
        imageAlt:
          "Young women participating in a football training session at a Cymru Unleashed event",
        source: {
          logo: "Images/BBC_Cymru_Wales_2022.png",
          name: "BBC Cymru Wales",
        },
        date: "May 2, 2025",
        title:
          "Welsh Football Initiative Empowers Young Women Ahead of Euro 2025",
        description:
          "BBC Cymru Wales highlights the Cymru Unleashed initiative and its impact on young women's participation in sports across Wales.",
        link: "#",
      },
      {
        image: "Images/Art_installation.jpg",
        imageAlt:
          "Community art installation created by Cymru Unleashed participants",
        source: {
          logo: "Images/S4C_logo_2014.png",
          name: "S4C",
        },
        date: "April 25, 2025",
        title: "Community Art Installations Celebrate Women in Welsh Sport",
        description:
          "S4C features the traveling art exhibitions created by Cymru Unleashed participants, highlighting the connection between sport and culture.",
        link: "#",
      },
      {
        image: "Images/Virtual_Reality_1.avif",
        imageAlt:
          "Young participant experiencing the VR showcase of Welsh women's sports journey",
        source: {
          logo: "Images/klat.jpg",
          name: "Voice.Wales",
        },
        date: "April 18, 2025",
        title: "VR Experience Brings Welsh Women's Sports Journey to Life",
        description:
          "Voice.Wales explores the innovative 360° VR experience created by Cymru Unleashed to showcase young Welsh women's journeys through sport.",
        link: "#",
      },
    ],
  },

  // Social Media Section
  socialMedia: {
    title: "Social Media",
    subtitle: "Follow Us",
    platforms: [
      {
        name: "Instagram",
        icon: "fab fa-instagram",
        tabId: "instagram",
        posts: [
          {
            image: "Images/seran.jpeg",
            avatar: "Images/seran.jpeg",
            username: "@CymruUnleashed",
            timeAgo: "2 days ago",
            content:
              "Celebrating the power of Welsh women in sport! Yesterday's workshop in Butetown was filled with energy, inspiration, and some amazing football skills. 🏆 #CymruUnleashed #WomensEuro2025",
            likes: 248,
            comments: 32,
          },
          {
            image: "Images/seran.jpeg",
            avatar: "Images/seran.jpeg",
            username: "@CymruUnleashed",
            timeAgo: "5 days ago",
            content:
              "Our art installations are bringing communities together across Wales! This piece, created by young women from Grangetown, tells powerful stories of identity, struggle, and triumph. 🎨 #Community #WelshCulture",
            likes: 186,
            comments: 24,
          },
          {
            image: "Images/seran.jpeg",
            avatar: "Images/seran.jpeg",
            username: "@CymruUnleashed",
            timeAgo: "1 week ago",
            content:
              "Behind the scenes of our VR experience shoot! Can't wait to share this journey through the eyes of young Welsh women in sport. Our incredible crew is capturing stories from across Wales. 🎬 #VR #DigitalStorytelling",
            likes: 312,
            comments: 47,
          },
        ],
      },
      {
        name: "TikTok",
        icon: "fab fa-tiktok",
        tabId: "tiktok",
        posts: [
          {
            image: "Images/seran.jpeg",
            avatar: "Images/seran.jpeg",
            username: "@CymruUnleashed",
            timeAgo: "1 day ago",
            content:
              "🔥 Learning football skills with our amazing coaches! Watch Seren from Tiger Bay FC teach our participants this awesome trick shot. #FootballSkills #WomensFootball",
            likes: 1200,
            comments: 87,
          },
          {
            image: "Images/seran.jpeg",
            avatar: "Images/seran.jpeg",
            username: "@CymruUnleashed",
            timeAgo: "3 days ago",
            content:
              "POV: You're at our Art Installation in Cardiff Bay and these amazing pieces created by young women from across Wales surround you. #ArtTok #WelshCulture",
            likes: 943,
            comments: 56,
          },
          {
            image: "Images/seran.jpeg",
            avatar: "Images/seran.jpeg",
            username: "@CymruUnleashed",
            timeAgo: "6 days ago",
            content:
              "Meet Carys, 16, from Swansea who went from never playing football to scoring this AMAZING goal in just 3 weeks of our program! 🔥 #FootballGoals #Inspiration",
            likes: 2400,
            comments: 142,
          },
        ],
      },
      {
        name: "Twitter",
        icon: "fab fa-twitter",
        tabId: "twitter",
        posts: [
          {
            avatar: "Images/seran.jpeg",
            username: "@UnleashedWales",
            timeAgo: "3 hours ago",
            content:
              "Excited to announce our partnership with @SportWales to bring more opportunities to young girls across Wales! Together, we'll be expanding our workshops to reach 10 more communities in the lead-up to #WomensEuro2025. 🏆 #GirlsInSport",
            retweets: 24,
            likes: 68,
          },
          {
            avatar: "Images/seran.jpeg",
            username: "@UnleashedWales",
            timeAgo: "1 day ago",
            content:
              "Our Cardiff Bay art installation opens TODAY! Come see the incredible work created by young women from across Wales, celebrating the intersection of sport, identity, and culture. Open daily 10am-6pm through July. #ArtExhibition #WomensFootball",
            retweets: 18,
            likes: 53,
          },
          {
            avatar: "Images/seran.jpeg",
            username: "@UnleashedWales",
            timeAgo: "2 days ago",
            content:
              "Thank you to @BBCCymruWales for the incredible coverage of our program! Watch the full feature here: [link] #WomensEuro2025 #CymruUnleashed",
            retweets: 32,
            likes: 91,
          },
        ],
      },
    ],
    socialLinks: [
      {
        platform: "Instagram",
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/cymru.unleashed",
      },
      {
        platform: "TikTok",
        icon: "fab fa-tiktok",
        url: "https://www.tiktok.com/@cymru.unleashed",
      },
      {
        platform: "Twitter",
        icon: "fab fa-twitter",
        url: "https://twitter.com/CymruUnleashed",
      },
      {
        platform: "YouTube",
        icon: "fab fa-youtube",
        url: "https://www.youtube.com/@CymruUnleashed",
      },
    ],
  },

  // Video Section
  videos: {
    title: "Featured Videos",
    description:
      "Watch stories and highlights from our events, workshops, and initiatives across Wales.",
    featured: {
      image: "Images/hero1.jpg",
      title: "Cymru Unleashed: The Journey Begins",
      description:
        "Our flagship documentary exploring the stories of young Welsh women in sport and how the Cymru Unleashed initiative is creating pathways for the next generation.",
    },
    thumbnails: [
      {
        image: "Images/communityWorkshop.jpg",
        title: "Butetown Workshop Highlights",
      },
      {
        image: "Images/Art_installation.jpg",
        title: "Meet the Artists",
      },
      {
        image: "Images/Virtual_Reality_1.avif",
        title: "VR Experience Preview",
      },
      {
        image: "Images/hero2.jpg",
        title: "S4C Interview",
      },
    ],
  },

  // Media Kit Section
  mediaKit: {
    title: "Media Kit & Resources",
    description:
      "Download official Cymru Unleashed resources for press, partners, and supporters. Our media kit includes logos, photos, fact sheets, and other materials to help share our story.",
    previewImage: "Images/media-kit-preview.jpg",
    downloads: [
      {
        icon: "fas fa-image",
        title: "Logo Pack",
        format: "PNG, SVG, EPS formats (2.4MB)",
        file: "Resources/logo-pack.zip",
      },
      {
        icon: "fas fa-file-pdf",
        title: "Press Release",
        format: "May 2025 (PDF, 340KB)",
        file: "Resources/press-release.pdf",
      },
      {
        icon: "fas fa-camera",
        title: "Photo Gallery",
        format: "High-resolution images (ZIP, 18MB)",
        file: "Resources/photo-gallery.zip",
      },
      {
        icon: "fas fa-file-alt",
        title: "Fact Sheet",
        format: "About Cymru Unleashed (PDF, 520KB)",
        file: "Resources/fact-sheet.pdf",
      },
    ],
  },

  // Press Contact Section
  pressContact: {
    title: "Press Contact",
    description:
      "For media inquiries, interview requests, or additional information about Cymru Unleashed, please get in touch with our press team.",
    contacts: [
      {
        type: "Email",
        icon: "fas fa-envelope",
        details: [
          {
            label: "Press Email",
            value: "press@cymruunleashed.org",
            link: "mailto:press@cymruunleashed.org",
          },
          {
            label: "General Email",
            value: "osama@otidentertainment.com",
            link: "mailto:osama@otidentertainment.com",
          },
        ],
      },
      {
        type: "Phone",
        icon: "fas fa-phone-alt",
        details: [
          {
            label: "Phone",
            value: "+44 12345 67890",
            link: "tel:+44123456789",
          },
          {
            label: "Hours",
            value: "Mon-Fri: 9am-5pm",
          },
        ],
      },
    ],
  },

  // Footer
  footer: {
    tagline:
      "Empowering the next generation of Welsh women through sport, art, and culture.",
    partners: [
      {
        src: "Images/otid.png",
        alt: "OTID Entertainment",
      },
      {
        src: "Images/afrowales.jpeg",
        alt: "Afrowales",
      },
      {
        src: "Images/race-council-cymru-rcc-logo.png",
        alt: "Race Council Cymru",
      },
      {
        src: "Images/klat.jpg",
        alt: "Klat",
      },
      {
        src: "Images/nativeradio.jpg",
        alt: "Native Radio",
      },
    ],
    quickLinks: [
      { text: "Home", url: "index.html" },
      { text: "About", url: "/About/about.html" },
      { text: "Activities", url: "/Activities/activities.html" },
      { text: "Legacy", url: "/Legacy/legacy.html" },
      { text: "Media", url: "/Media/media.html" },
      { text: "Get Involved", url: "/getInvolved/get-involved.html" },
    ],
    contact: {
      email: {
        label: "Email:",
        value: "samuel.habu@otidentertainment.com",
        link: "mailto:samuel.habu@otidentertainment.com",
      },
      phone: {
        label: "Phone number:",
        value: "07455683291",
        link: "tel:07455683291",
      },
      email2: {
        label: "Email:",
        value: "osama@otidentertainment.com",
        link: "mailto:osama@otidentertainment.com",
      },
      social: [
        {
          platform: "Instagram",
          label: "Instagram:",
          value: "@cymru.unleashed",
          link: "https://www.instagram.com/cymru.unleashed",
        },
        {
          platform: "Twitter",
          label: "Twitter:",
          value: "@CymruUnleashed",
          link: "https://twitter.com/CymruUnleashed",
        },
        {
          platform: "TikTok",
          label: "TikTok:",
          value: "@cymru.unleashed",
          link: "https://www.tiktok.com/cymru.unleashed",
        },
      ],
    },
    copyright: "© 2025 Cymru Unleashed. All rights reserved.",
  },
};
