const siteConfig = {
  navigation: [
    { path: "/index.html", label: "Home", icon: "fas fa-home" },
    { path: "about.html", label: "About", icon: "fas fa-info-circle" },
    {
      path: "/Activities/activities.html",
      label: "Activities",
      icon: "fas fa-futbol",
    },
    { path: "/Legacy/legacy.html", label: "Legacy", icon: "fas fa-monument" },
    { path: "/Media/media.html", label: "Media", icon: "fas fa-photo-video" },
    {
      path: "/getInvolved/get-involved.html",
      label: "Get Involved",
      icon: "fas fa-hands-helping",
    },
  ],
  heroStats: [
    { number: "50%", label: "Women Leadership" },
    { number: "1000+", label: "Girls Empowered" },
    { number: "15+", label: "Communities" },
  ],
  teamMembers: [
    {
      name: "Rhiannon Davies",
      role: "Founder & Director",
      image: "/Images/lady1.jpg",
      description:
        "Former Wales international footballer and community coach with over 15 years of experience in sports development.",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Megan Thomas",
      role: "Creative Director",
      image: "/Images/Megan.jpg",
      description:
        "Artist and educator specialized in community-based art projects and digital media storytelling.",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Seren Jones",
      role: "Community Engagement",
      image: "/Images/seran.jpeg",
      description:
        "Community organizer with expertise in youth development and social inclusion programs.",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
  ],
  coreValues: [
    {
      icon: "fas fa-users",
      title: "Inclusivity",
      description:
        "We create spaces where everyone feels welcome and valued, regardless of background, ability, or experience. We actively work to remove barriers to participation.",
    },
    {
      icon: "fas fa-handshake",
      title: "Collaboration",
      description:
        "We believe in the power of partnership and bringing together diverse perspectives and expertise to create something greater than the sum of its parts.",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Innovation",
      description:
        "We approach challenges with creativity and an open mind, always seeking new ways to engage, inspire, and create meaningful impact.",
    },
    {
      icon: "fas fa-heart",
      title: "Authenticity",
      description:
        "We honor Welsh culture, language, and heritage while embracing the diversity within our communities. We celebrate genuine expression in all forms.",
    },
  ],
  footer: {
    socialLinks: {
      instagram: "https://www.instagram.com/cymru.unleashed",
      tiktok: "https://www.tiktok.com/@cymru.unleashed",
      twitter: "https://twitter.com/CymruUnleashed",
      youtube: "https://www.youtube.com/@CymruUnleashed",
    },
    partners: [
      { name: "OTID Entertainment", logo: "Images/otid.png" },
      { name: "Afrowales", logo: "Images/afrowales.jpeg" },
      {
        name: "Race Council Cymru",
        logo: "Images/race-council-cymru-rcc-logo.png",
      },
      { name: "Klat", logo: "Images/klat.jpg" },
      { name: "Native Radio", logo: "Images/nativeradio.jpg" },
    ],
    contact: {
      email1: "samuel.habu@otidentertainment.com",
      email2: "osama@otidentertainment.com",
      phone: "07455683291",
    },
  },
  copyright: {
    year: new Date().getFullYear(),
    text: "Cymru Unleashed. All rights reserved.",
  },
};
