export const SKILLS = [
  'Swift', 'Objective-C', 'SwiftUI', 'React Native', 'Kotlin', 'JavaScript',
  'React', 'TypeScript', 'Web Development', 'Design Thinking', 'Front End Coding',
  'Problem-Solving', 'Project Management', 'ArcGIS', 'Strong Communication',
  'Firebase', 'REST APIs', 'VOIP', 'Machine Learning',
]

export const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: '⌨️',
    skills: ['Swift', 'Objective-C', 'Kotlin', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frameworks & Tools',
    icon: '🛠️',
    skills: ['SwiftUI', 'React Native', 'React', 'Firebase', 'REST APIs', 'Alamofire'],
  },
  {
    title: 'Specializations',
    icon: '⚡',
    skills: ['VOIP', 'Machine Learning', 'Design Thinking', 'ArcGIS'],
  },
  {
    title: 'Leadership & Soft Skills',
    icon: '🤝',
    skills: ['Team Leadership', 'Mentoring', 'Problem-Solving', 'Project Management', 'Strong Communication'],
  },
]

export const ABOUT_STATS = [
  { value: '7+', label: 'Years', icon: '📅' },
  { value: '35+', label: 'Apps Shipped', icon: '📱' },
  { value: 'iOS · Android', label: 'Platforms', icon: '💻' },
]

export const EXPERTISE_AREAS = [
  { title: 'Mobile Development', desc: 'iOS, Android, cross-platform apps.', icon: '📱' },
  { title: 'Web Development', desc: 'React, responsive sites, SPAs.', icon: '🌐' },
  { title: 'VOIP & Real-time', desc: 'Video/audio calling, live streaming.', icon: '📞' },
  { title: 'Machine Learning', desc: 'AI, computer vision in apps.', icon: '🧠' },
  { title: 'Payments & Commerce', desc: 'In-app purchases, subscriptions.', icon: '💳' },
  { title: 'Architecture & Scale', desc: 'Clean code, performance.', icon: '🏗️' },
  { title: 'Team Leadership', desc: 'Lead teams, mentor devs.', icon: '👥' },
]

export const PROJECTS = [
  { name: 'Authentic Detective', role: 'Senior Software Engineer', desc: 'Platform for fashion enthusiasts and luxury brand connoisseurs.', tech: ['React Native', 'Swift', 'Kotlin'], appStore: 'https://apps.apple.com/us/app/authentic-detective/id1659681647', playStore: 'https://play.google.com/store/apps/details?id=com.techificent.authenticdetetctive&hl=en' },
  { name: 'Remember RQR', role: 'Senior Software Engineer', desc: 'Honor veterans by creating detailed profiles with metal QR codes on gravestones.', tech: ['Swift', 'Kotlin', 'QR Code'], appStore: null, playStore: 'https://play.google.com/store/apps/details?id=com.remember.rqr&hl=en', screenshotSource: 'playstore' as const },
  { name: 'BlogTo', role: 'Senior Software Engineer', desc: 'Find the best Toronto restaurants, bars, and places. Best of Toronto lists.', tech: ['Swift', 'Google APIs', 'FCM'], appStore: 'https://apps.apple.com/ca/app/blogto/id435310228', playStore: 'https://play.google.com/store/apps/details?id=com.freshdaily.blogto&hl=en' },
  { name: 'Cardify', role: 'Senior Software Engineer', desc: 'Greeting cards and e-cards app. Create custom cards with photos and filters.', tech: ['Swift', 'SwiftUI', 'Firebase'], appStore: 'https://apps.apple.com/us/app/cardify-greeting-cards/id1601084960', playStore: null },
  { name: 'Cattle Worth', role: 'Senior Software Engineer', desc: 'Cattle management with AI-powered weight estimation and herd tracking.', tech: ['Swift', 'Machine Learning', 'Firebase'], appStore: 'https://apps.apple.com/pk/app/cattle-worth/id6736498197', playStore: 'https://play.google.com/store/apps/details?id=com.app.cattleworth&hl=en' },
  { name: 'Date Fit', role: 'Senior Software Engineer', desc: 'Fitness-focused social and dating app.', tech: ['Swift', 'Google APIs', 'FCM'], appStore: 'https://apps.apple.com/in/app/datefit/id1245839522', playStore: null },
  { name: 'Dedicate Healthy Kitchen', role: 'Senior Software Engineer', desc: 'Order online at Dedicate Healthy Kitchen. View menu and promotions, delivery costs, hours, order history and more.', tech: ['Swift', 'Kotlin', 'Food & Drink'], appStore: 'https://apps.apple.com/ca/app/dedicate-healthy-kitchen-app/id6477765701', playStore: 'https://play.google.com/store/apps/details?id=com.upmenu.dedicateHealthyKitchen&hl=en' },
  { name: 'Dekho Canada', role: 'Senior Software Engineer', desc: 'Stream multicultural shows from VisionTV, JoyTV and FaithTV.', tech: ['Swift', 'Video Streaming'], appStore: 'https://apps.apple.com/ca/app/dekho-canada/id1623195567', playStore: 'https://play.google.com/store/apps/details?id=com.zoomermedia.android.dekho&hl=en' },
  { name: 'DreamSage', role: 'Senior Software Engineer', desc: 'AI-powered dream interpretation app.', tech: ['Swift', 'AI/ML', 'Firebase'], appStore: 'https://apps.apple.com/pk/app/dreamsage-ai/id6474189818', playStore: 'https://play.google.com/store/apps/details?id=com.southlakeconsulting.dreamsage&hl=en' },
  { name: 'Drive Roadside', role: 'Senior Software Engineer', desc: 'Roadside assistance for emergency vehicle support.', tech: ['Swift', 'Google APIs', 'FCM'], appStore: 'https://apps.apple.com/us/app/roadside-assistance/id6514324513', playStore: 'https://play.google.com/store/apps/details?id=com.roadside.drive&hl=en' },
  { name: 'First Stop Shop', role: 'Senior Software Engineer', desc: 'Connects local business owners with shoppers.', tech: ['React Native', 'Swift', 'Kotlin'], appStore: 'https://apps.apple.com/sg/app/first-stop-shop/id1594190175', playStore: null },
  { name: 'Fyfer', role: 'Software Engineer', desc: 'All-in-one fitness platform for FitPros and FitFriends.', tech: ['Swift', 'Firebase', 'FCM'], appStore: 'https://apps.apple.com/pk/app/fyfer/id1611138593', playStore: null },
  { name: 'Lampo Stand', role: 'Senior Software Engineer', desc: 'Social networking app with QR code friend discovery.', tech: ['Swift', 'Google APIs', 'QR Scanner'], appStore: 'https://apps.apple.com/us/app/lampo-social-networking/id1597086445', playStore: null },
  { name: 'ShowReady', role: 'Senior Software Engineer', desc: 'Music rehearsal solution for musical theater.', tech: ['Swift', 'Audio', 'iPad'], appStore: 'https://apps.apple.com/us/app/show-ready/id686687677', playStore: 'https://play.google.com/store/apps/details?id=com.rightoncueservices.showready&hl=en' },
  { name: 'Meditation', role: 'Software Engineer', desc: 'Meditation app by Christopher Macklin.', tech: ['Swift', 'Audio'], appStore: 'https://apps.apple.com/us/app/meditation-christopher-macklin/id1086108174', playStore: null },
  { name: 'OneApp by Dubai Holding', role: 'Senior Software Engineer', desc: 'Official app for Dubai Holding.', tech: ['Swift', 'Google APIs'], appStore: 'https://apps.apple.com/ae/app/oneapp-by-dubai-holding/id1475476120', playStore: null },
  { name: 'Real Connect', role: 'Senior Software Engineer', desc: 'Social and networking platform.', tech: ['Swift', 'Firebase'], appStore: 'https://apps.apple.com/us/app/mydp/id1346538794', playStore: null },
  { name: 'VORA', role: 'Senior Software Engineer', desc: 'Cultural lifestyle app.', tech: ['Swift', 'Alamofire'], appStore: 'https://apps.apple.com/pk/app/%EB%AC%B8%ED%99%94%EC%83%9D%ED%99%9C%EC%9D%98-%EC%8B%9C%EC%9E%91-vora/id1443968462', playStore: null },
  { name: 'MGXchange', role: 'Senior Software Engineer', desc: 'Exchange and trading platform.', tech: ['Swift', 'Google APIs'], appStore: 'https://apps.apple.com/us/app/mgxchange/id1579686419', playStore: null },
  { name: 'Flipping Weight', role: 'Senior Software Engineer', desc: 'Weight tracking and fitness app.', tech: ['Swift', 'HealthKit'], appStore: 'https://apps.apple.com/us/app/flipping-weight/id1527977492', playStore: null },
  { name: 'Vessel Health', role: 'Senior Software Engineer', desc: 'Health-tracking app with personalized wellness plans. A powerful health and wellness solution designed by doctors and backed by science.', tech: ['SwiftUI', 'Swift', 'Google APIs'], appStore: 'https://apps.apple.com/pk/app/vessel-home-wellness-tracker/id1501275949', playStore: null, screenshotSource: 'website' as const, screenshotUrl: 'https://vesselhealth.com' },
  { name: 'OdHabit', role: 'Senior Software Engineer', desc: 'AI-powered life system for habit building.', tech: ['Swift', 'SwiftUI', 'AI/ML'], appStore: 'https://apps.apple.com/us/app/odhabit-your-life-system/id6749651365', playStore: null },
  { name: 'CM Prayers', role: 'Software Engineer', desc: 'Prayer app with daily prayers and reminders.', tech: ['Swift', 'Local Notifications'], appStore: 'https://apps.apple.com/us/app/cm-prayers/id948388797', playStore: null },
  { name: 'Auto Prayers', role: 'Software Engineer', desc: 'Automated prayer reminders.', tech: ['Swift', 'Local Notifications'], appStore: 'https://apps.apple.com/us/app/autoprayers/id948394437', playStore: null },
  { name: 'Pet Calendar', role: 'Senior Software Engineer', desc: 'Pet care calendar.', tech: ['Swift', 'SwiftUI'], appStore: 'https://apps.apple.com/us/app/pet-calendar/id6739590141', playStore: null },
  { name: 'Playing for Keeps', role: 'Senior Software Engineer', desc: 'Dating app for ambitious singles.', tech: ['Swift', 'Video Calling'], appStore: 'https://apps.apple.com/us/app/playing-4-keeps-dating-games/id1598330739', playStore: 'https://play.google.com/store/apps/details?id=com.codingpixel.playing4keeps&hl=en' },
  { name: 'Podify', role: 'Senior Software Engineer', desc: 'Podcast app.', tech: ['Kotlin', 'Android'], appStore: null, playStore: 'https://play.google.com/store/apps/details?id=com.techificent.podify&hl=en', screenshotSource: 'playstore' as const },
  { name: 'Sneaky Links', role: 'Senior Software Engineer', desc: 'Social community app.', tech: ['Swift', 'React Native'], appStore: 'https://apps.apple.com/eg/app/sneaky-links-social-community/id6449924206', playStore: 'https://play.google.com/store/apps/details?id=com.sneakylinks&hl=en' },
  { name: 'Stessa', role: 'Senior Software Engineer', desc: 'Smart rental property manager for landlords.', tech: ['Swift', 'Google APIs'], appStore: 'https://apps.apple.com/us/app/stessa-smart-rental-manager/id1374556096', playStore: 'https://play.google.com/store/apps/details?id=com.stessa.stessa&hl=en' },
  { name: 'Easy Islam', role: 'Senior Software Engineer', desc: 'Comprehensive Islamic app.', tech: ['React Native', 'Swift', 'Kotlin'], appStore: 'https://apps.apple.com/tr/app/easy-islam-360-ramadan-2026/id1613735799', playStore: 'https://play.google.com/store/apps/details?id=com.techificent.ramadan&hl=en' },
  { name: 'UVibrator', role: 'Software Engineer', desc: 'U Vibrating massager app.', tech: ['Swift', 'Bluetooth'], appStore: 'https://apps.apple.com/us/app/imassage-u-vibrating-massager/id1064850875', playStore: null },
  { name: 'Wevolv', role: 'Senior Software Engineer', desc: 'Platform for professional athletes.', tech: ['Swift', 'Google APIs'], appStore: 'https://apps.apple.com/pk/app/wevolv/id6466331774', playStore: null },
  { name: 'Bond Love', role: 'Software Engineer', desc: 'Couples app for staying connected.', tech: ['Swift', 'Firebase'], appStore: 'https://apps.apple.com/us/app/bond-love/id1473259744', playStore: null },
  { name: 'MedOnline', role: 'Senior Software Engineer', desc: 'PHIPA/PIPEDA-compliant telehealth platform.', tech: ['Swift', 'Google APIs', 'Agora'], appStore: 'https://apps.apple.com/us/app/medonline/id1619809866', playStore: null },
  { name: 'Oasis', role: 'Senior Software Engineer', desc: 'Event management for Oasis Golf & Aqua Resort.', tech: ['Swift', 'Alamofire'], appStore: 'https://apps.apple.com/pk/app/the-oasis-golf-aqua-resort/id1443055449', playStore: null },
  { name: 'BNW Collections', role: 'Senior Software Engineer', desc: 'E-commerce camera accessory store.', tech: ['Swift', 'Google APIs'], appStore: 'https://apps.apple.com/pk/app/bnw-collections/id1237350974', playStore: null },
  { name: 'The Rabt', role: 'Senior Software Engineer', desc: 'Property marketing app.', tech: ['Swift', 'Alamofire'], appStore: null, playStore: null },
  { name: 'Equiptal', role: 'Senior Software Engineer', desc: 'Construction equipment rental marketplace.', tech: ['Swift', 'Google Maps'], appStore: null, playStore: null },
  { name: 'The Workout Pros', role: 'Senior Software Engineer', desc: 'Online marketplace for trainers.', tech: ['Swift', 'Google APIs'], appStore: null, playStore: null },
]

export const CONTACT = {
  email: 'hamzayasin999@gmail.com',
  phone: '+92 334 4065528',
  location: 'Lahore, Pakistan',
  linkedin: 'https://www.linkedin.com/in/iosdeveloper-swiftdeveloper-iosdevelopment-iosexpert/',
  github: 'https://github.com/Hzy5',
  availability: 'Open to new opportunities and collaborations',
}

export const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/about', label: 'About', icon: '👤' },
  { path: '/projects', label: 'Projects', icon: '📱' },
  { path: '/contact', label: 'Contact', icon: '✉️' },
]
