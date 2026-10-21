import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// এখানে আমরা ইংরেজি এবং বাংলা ভাষার শব্দগুলো ডিকশনারির মতো সাজিয়ে রাখবো
const resources = {
  en: {
    translation: {
      nav_home: 'Home',
      nav_about: 'About',
      nav_activities: 'Activities',
      nav_media: 'Media',
      nav_gallery: 'Gallery',
      nav_news: 'News & Blog',
      nav_get_involved: 'Get Involved',
      nav_volunteer: 'Volunteer',
      nav_donate: 'Donate Now',
      nav_contact: 'Contact',
      lang_btn: 'বাংলা',
      // Home Page Translations
      hero_title_1: 'Helping People, Building a Better Future',
      hero_desc_1:
        'Join hands with us to support underprivileged and vulnerable communities across Bangladesh.',
      btn_donate_now: 'Donate Now',
      btn_join_us: 'Join Us',
      hero_title_2: 'Zero Hunger Initiative',
      hero_desc_2: 'We strive to ensure that no one goes to sleep on an empty stomach.',
      btn_our_work: 'Our Work',

      about_subtitle: 'About Us',
      about_title: 'Spreading Kindness & Humanity',
      about_p1:
        'AN-NAS Welfare Foundation is a non-profit organization dedicated to bringing positive change to society. We believe that every individual deserves the opportunity to live with dignity, hope, and basic human rights.',
      about_p2:
        'Through the dedication of our volunteers, donors, and partners, we continuously work to improve the lives of disadvantaged people and build a compassionate community.',
      btn_read_more: 'Read More',

      services_subtitle: 'Our Work',
      services_title: 'How We Help',
      service_edu_title: 'Education',
      service_edu_desc:
        'Providing books, school fees, and essential support to underprivileged children.',
      service_med_title: 'Medical Help',
      service_med_desc:
        'Organizing free medical camps, supplying medicines, and offering healthcare.',
      service_food_title: 'Food Supply',
      service_food_desc:
        'Distributing nutritious food to the hungry and providing special Ramadan meals.',
      service_disaster_title: 'Disaster Relief',
      service_disaster_desc:
        'Emergency response and relief materials during floods, storms, and disasters.',

      funds_title: 'Donation Funds',
      funds_subtitle: "Let's bring a change together",
      fund_zakat_title: 'Zakat Fund',
      fund_zakat_desc:
        'Zakat is a vital tool to eradicate poverty. 100% of your Zakat is distributed to the rightful beneficiaries.',
      fund_regular_title: 'Regular Donation',
      fund_regular_desc:
        'Contribute regularly to sustain our ongoing welfare projects and operational costs.',
      fund_self_title: 'Self-Reliance Fund',
      fund_self_desc:
        'Help families break the cycle of poverty by providing them with small business assets or rickshaws.',
      fund_emergency_title: 'Emergency Relief Fund',
      fund_emergency_desc:
        'Help us respond quickly to natural disasters, floods, and emergencies by providing immediate relief.',
      btn_view_all_funds: 'View All Funds',

      activities_title: 'Recent Activities',
      btn_see_all: 'See All',
      btn_see_all_activities: 'See All Activities',

      vol_title: 'Become a Proud Volunteer',
      vol_desc:
        'Join our dedicated team and make a real difference in the lives of the underprivileged communities across the country.',
      btn_join_now: 'Join Now',

      news_title: 'Latest News & Updates',
      news_update_badge: 'Update',
      btn_read_all_news: 'Read All News',
      // About Page Translations
      ab_header_title: 'About Us',
      ab_header_sub:
        'Discover our inspiring journey and mission as an NGO, driven to make a positive impact on the world.',
      ab_title: 'About Us',
      ab_subtitle: 'Embracing Humanity: A Tale of Warmth and True Support',
      ab_desc:
        "With a caring heart and open arms, we strive to create a nurturing environment where individuals can find solace, understanding, and the strength to overcome life's challenges. Through genuine connections and unwavering dedication, we aim to make a positive impact, uplifting the spirits of those in need and fostering a sense of belonging within our community.",
      ab_btn: 'Contact Us',

      stat_1: 'RAISED DONATIONS',
      stat_2: 'SAVING ONES',
      stat_3: 'COMMUNITY',
      stat_4: 'TARGET ACHIEVED',

      helped_title: 'Helped till now',
      feat_1_title: 'Helping humanity',
      feat_1_desc:
        'Through education, healthcare, sustainable development, and emergency relief, we make a positive impact. Join us now',
      feat_2_title: 'Love your ecosystem',
      feat_2_desc:
        "Through awaking people we're on a mission to inspire love and care for our environment to keep balance nature.",
      feat_3_title: 'Empowering Communities',
      feat_3_desc:
        "Through strategic partnerships and dedicated volunteers, we've been able to swiftly respond to emergencies, offering shelter, food.",

      cert_title: 'Approvals & Certifications',
      cert_1_name: 'Registration Certificate',
      cert_2_name: 'ISO Certification',
      cert_3_name: 'Skill Development Affiliation',
      btn_download: 'Download',

      policy_title: 'Income & Expenditure Policy',
      tab_income: 'Sources of Income',
      tab_service: 'Service Expenditure',
      tab_management: 'Management Cost',

      inc_1: 'General voluntary donations (Sadaqah) from individuals and organizations.',
      inc_2: 'Zakat funds collected specifically to be distributed among eligible beneficiaries.',
      inc_3: 'Corporate Social Responsibility (CSR) funds provided by partner companies.',
      inc_4:
        'Dedicated funds raised for specific seasonal campaigns (e.g., Qurbani, Winter relief).',

      srv_1: 'Donations are spent in accordance with Islamic Shariah principles and national laws.',
      srv_2:
        'Funds are spent strictly in the sector for which they were donated. Funds from one sector are not transferred to another.',
      srv_3:
        '100% of the Zakat fund is distributed among the rightful beneficiaries. Zakat money is never used for management purposes; general funds are used for that.',
      srv_4:
        'After the completion of each project, detailed income and expenditure accounts are maintained following international standards.',
      srv_5:
        "Once a year, the foundation's financial accounts are audited by a Chartered Accountant, and a report is published.",
      srv_6:
        'All financial activities of AN-NAS Foundation are strictly monitored under the supervision of a team comprising expert advisors.',

      mgt_1:
        'Operational and administrative costs are kept to an absolute minimum to maximize beneficiary impact.',
      mgt_2:
        'Staff salaries, office rent, and utility bills are paid exclusively from the general fund (Sadaqah), NEVER from the Zakat fund.',
      mgt_3:
        'Marketing and promotional expenses are optimized and often sponsored by specific well-wishers to save organizational funds.',
      // Contact Page Translations
      contact_header_title: 'Contact Us',
      contact_header_sub: 'Have questions or want to get involved? We would love to hear from you.',
      contact_info_title: 'Get in Touch',
      contact_info_desc:
        'Whether you want to donate, volunteer, or partner with us, feel free to drop a message or visit our office.',
      contact_office: 'Office Address',
      contact_office_addr:
        'Kha-12/2, (3rd Floor), Progoti Sarani, Shahjadpur, Gulshan, Dhaka-1212, Bangladesh',
      contact_phone: 'Phone Number',
      contact_email: 'Email Address',
      contact_social: 'Follow Us',
      contact_form_title: 'Send Us a Message',
      form_your_name: 'Your Name',
      form_your_phone: 'Your Phone Number',
      form_your_email: 'Your Email',
      form_subject: 'Subject',
      form_message: 'Write your message here...',
      btn_sending: 'Sending...',
      btn_send_msg: 'Send Message',
      swal_msg_sent: 'Message Sent!',
      swal_msg_failed: 'Failed to send message. Please try again.',
      // Activities Page Translations
      act_header_title: 'Our Activities',
      act_header_sub:
        "Field-level updates on our regular activities and projects. See for yourself how your donations are bringing smiles to people's faces.",
      act_btn_read_more: 'Read More',
      // Volunteer Page Translations
      vol_header_title: 'Become a Volunteer',
      vol_header_sub:
        'Join our dedicated team and make a real difference in the lives of the underprivileged.',
      vol_info_title: 'Why Volunteer With Us?',
      vol_info_desc1:
        "Volunteering is not just about giving your time; it's about giving your heart. When you join <strong>AN-NAS Welfare Foundation</strong>, you become part of a family that works tirelessly to bring smiles to those who have forgotten how to smile.",
      vol_benefit_1_title: 'Impact Lives',
      vol_benefit_1_desc:
        'Directly contribute to projects that provide education, food, and medical help.',
      vol_benefit_2_title: 'Learn & Grow',
      vol_benefit_2_desc: 'Develop leadership skills, teamwork, and gain valuable experience.',
      vol_benefit_3_title: 'Build a Network',
      vol_benefit_3_desc: 'Meet like-minded people who share your passion for social work.',
      vol_form_title: 'Join Our Team',
      form_name: 'Full Name *',
      form_name_placeholder: 'John Doe',
      form_phone: 'Phone Number *',
      form_phone_placeholder: '01XXXXXXXXX',
      form_email: 'Email Address',
      form_email_placeholder: 'example@mail.com',
      form_address: 'Current Address *',
      form_address_placeholder: 'Dhaka, Bangladesh',
      form_reason: 'Why do you want to join us? *',
      form_reason_placeholder:
        'Tell us a little bit about yourself and why you want to volunteer...',
      btn_submitting: 'Submitting...',
      btn_submit_app: 'Submit Application',
      swal_success_title: 'Application Submitted!',
      swal_success_text: 'Thank you for your interest in volunteering with us.',
      swal_error_title: 'Oops...',
      swal_error_text: 'Something went wrong. Please try again later.',
      // Volunteer Page - extra keys (form labels, placeholders, alerts)
      vol_page_sub: 'Join AN-NAS Welfare Foundation and make a difference.',
      vol_app_form_title: 'Application Form',
      vol_label_email: 'Email Address (Optional)',
      vol_label_image: 'Profile Picture (Optional)',
      vol_label_address: 'Present Address *',
      vol_ph_name: 'Enter your name',
      vol_ph_phone: 'Enter phone number',
      vol_ph_email: 'Enter email address',
      vol_ph_address: 'Enter your full address',
      vol_ph_reason: 'Tell us about your motivation...',
      vol_btn_submitting: 'Submitting Application...',
      vol_swal_limit_title: 'Limit Reached!',
      vol_swal_limit_text: 'Too many applications have been submitted. Please try again later.',
      vol_swal_error_text: 'Failed to submit application. Please try again.',
      // Donation Page Translations
      don_header_title: 'Donation Funds',
      don_header_sub: 'Contribute to specific causes and help us build a better future.',
      don_btn: 'Details & Donate',

      f_zakat_title: 'Zakat Fund',
      f_zakat_desc:
        '100% of your Zakat is distributed among the rightful beneficiaries according to Shariah principles.',
      f_regular_title: 'Regular Donation',
      f_regular_desc:
        'Contribute monthly or regularly to sustain our ongoing welfare projects and operational costs.',
      f_qurbani_title: 'Qurbani for All',
      f_qurbani_desc:
        'Help us provide fresh meat to thousands of underprivileged families during Eid-ul-Adha.',
      f_iftar_title: 'Iftar Fund',
      f_iftar_desc:
        'Provide nutritious Iftar meals to fasting people in need and street children during Ramadan.',
      f_edu_title: 'Education Support',
      f_edu_desc:
        'Support the education, accommodation, and healthcare of meritorious students from poor backgrounds.',
      f_self_title: 'Self-Reliance Fund',
      f_self_desc:
        'Help families break the cycle of poverty by providing them with small business assets or rickshaws.',
      f_disaster_title: 'Emergency Disaster',
      f_disaster_desc:
        'Stand by the victims during floods, cyclones, and sudden natural calamities with emergency relief.',
      f_winter_title: 'Winter Relief',
      f_winter_desc:
        'Bring warmth to the poor people by distributing blankets and winter clothing across the country.',
      f_tree_title: 'Tree Plantation',
      f_tree_desc:
        'Join the initiative to build a green earth. Plant trees for a healthier environment for future generations.',
      f_medical_title: 'Medical Help',
      f_medical_desc:
        'Providing life-saving medicines and organizing free health camps for those who cannot afford treatment.',
      // Footer Translations
      footer_desc:
        'Committed to creating sustainable social impact and spreading kindness, humanity, and support to make a better future for everyone.',
      footer_follow_us: 'Follow Us',
      footer_quick_links: 'Quick Links',
      footer_contact_info: 'Contact Info',
      footer_address:
        'Kha-12/2, (3rd Floor), Progoti Sarani, Shahjadpur, Gulshan, Dhaka-1212, Bangladesh',
      footer_copyright: '© 2026 AN-NAS Welfare Foundation. All Rights Reserved.',

      // Fund Details Page Translations
      fd_subtitle: "Let's bring a change together",
      fd_sectors_regular: 'Sectors of Expenditure',
      fd_sectors_other: 'Sectors We Focus On',
      fd_btn_zakat_calc: 'Calculate your Zakat easily',
      fd_freq_daily: 'Daily',
      fd_freq_monthly: 'Monthly',
      fd_other_amount: 'Other Amount',
      fd_amount_label: 'Amount *',
      fd_amount_ph: '৳ Amount',
      fd_name_label: 'Your Name',
      fd_name_ph: 'Enter here',
      fd_contact_label: 'Mobile / Email *',
      fd_contact_ph: 'Enter here',
      fd_behalf_label: 'If donating on behalf of someone else, enter their name',
      fd_payment_label: 'Payment Method *',
      fd_next_step: 'Next Step',
      fd_pay_methods_title: 'Payment Methods',
      fd_mobile_banking: 'bKash & Nagad',
      fd_copied: 'Copied!',
      fd_copy: 'Copy',
      fd_bank_acc_title: 'Official Bank Account',
      fd_bank: 'Bank:',
      fd_acc_name: 'Name:',
      fd_acc_no: 'Account No:',
      fd_branch: 'Branch:',

      // Zakat Calculator
      fd_zakat_calc_title: 'Zakat Calculator',
      fd_zakat_note:
        'Note: If your net wealth reaches the Nisab (value of 595g silver or 85g gold) and is held for a year, Zakat becomes obligatory.',
      fd_zakat_assets: 'Zakat-eligible Assets (+)',
      fd_cash: 'Cash in hand and bank',
      fd_gold: 'Current market value of gold and silver',
      fd_investments: 'Investments, shares, or savings certificates',
      fd_stock: 'Business inventory (stock)',
      fd_receivables: 'Receivables (expected to be recovered)',
      fd_liabilities: 'Deductible liabilities or debts (-)',
      fd_debts: 'Your personal debts or loans (payable)',
      fd_payable: 'Your payable Zakat amount (2.5%)',
      fd_cancel: 'Cancel',
      fd_donate_this: 'Donate this amount',

      // SweetAlert
      swal_processing: 'Processing...',
      swal_wait: 'Please wait',
      swal_success_title2: 'Alhamdulillah!',
      swal_success_msg:
        'Thank you! Your donation details have been received. They will be confirmed after we verify the Transaction ID.',
      swal_err_title2: 'Sorry!',
      swal_err_msg: 'Please fill all information correctly.',
      swal_server_err: 'Server Error!',
      swal_server_msg: 'Cannot connect to the Laravel backend server.',

      // Dynamic Funds Data Object
      funds_data: {
        zakat: {
          title: 'Zakat Fund',
          quote: '"Establish prayer and give Zakat..."',
          source: '(Surah Baqarah, 110)',
          desc: 'Zakat is one of the five pillars of Islam and the right of the poor. It helps reduce economic inequality.',
          sectors: [
            'Self-reliance projects',
            'Student scholarships',
            'Other Shariah-compliant sectors',
          ],
          ctaTitle: "Let's bring a smile together",
          ctaDesc: 'Your Zakat will be a source of income for the destitute.',
        },
        general: {
          title: 'Regular Donation',
          quote:
            '"The most beloved deed to Allah is the most regular and constant even if it were little."',
          source: '(Sahih Bukhari)',
          desc: 'Regular donations help the foundation sustain its operations the most.',
          sectors: ['All welfare activities', 'Funding new initiatives'],
          ctaTitle: 'Participate in all welfare activities',
          ctaDesc: 'Through this fund, you can be a partner in all our welfare activities.',
        },
        qurbani: {
          title: 'Qurbani for All',
          quote:
            '"The blood of the Qurbani animal is accepted by Allah before it even reaches the ground."',
          source: '(Tirmidhi)',
          desc: 'Ensure that underprivileged families are not deprived of Qurbani meat.',
          sectors: ['Meat distribution in remote areas', 'Priority for the needy and widows'],
          ctaTitle: 'Spread the joy of Eid',
          ctaDesc: 'A portion of your Qurbani will bring smiles to helpless people.',
        },
        iftar: {
          title: 'Iftar Fund',
          quote: '"Whoever provides Iftar for a fasting person will get the same reward..."',
          source: '(Tirmidhi)',
          desc: 'Nutritious Iftar is arranged for the helpless, street children, and destitute during Ramadan.',
          sectors: ['Iftar for floating people', 'Iftar for street children'],
          ctaTitle: "Take responsibility for a fasting person's Iftar",
          ctaDesc: 'Share the blessings of Ramadan with the underprivileged.',
        },
        education: {
          title: 'Education Support Fund',
          quote:
            '"Whoever takes a path in search of knowledge, Allah makes the path to Paradise easy for them."',
          source: '(Sahih Muslim)',
          desc: "We provide monthly scholarships so that no meritorious student's education stops due to poverty.",
          sectors: [
            'Monthly scholarship for meritorious students',
            'Books and uniforms for Madrasa students',
          ],
          ctaTitle: "Take responsibility for a child's education",
          ctaDesc: "Your donation will light up a child's future.",
        },
        'self-reliance': {
          title: 'Self-Reliance Project',
          quote:
            '"Nobody has ever eaten a better meal than that which one has earned by working with one\'s own hands."',
          source: '(Sahih Bukhari)',
          desc: 'We help helpless families become self-reliant by providing sewing machines, rickshaws, or capital for small businesses.',
          sectors: ['Sewing machines for widows', 'Financial support for small businesses'],
          ctaTitle: 'Make a family self-reliant',
          ctaDesc: 'Your donation gives a family the chance to live with dignity.',
        },
        disaster: {
          title: 'Emergency Disaster Fund',
          quote:
            '"Whoever relieves a believer\'s distress of the world, Allah will relieve their distress on the Day of Resurrection."',
          source: '(Sahih Muslim)',
          desc: 'This emergency fund is used to stand by the affected people during any sudden disaster like floods or cyclones.',
          sectors: [
            'Rescue operations and shelter during disasters',
            'Distribution of dry food and pure water',
          ],
          ctaTitle: 'Come forward to help the victims',
          ctaDesc: 'Stand by helpless people in times of danger.',
        },
        winter: {
          title: 'Winter Relief Fund',
          quote:
            '"Whoever clothes a naked person, Allah will clothe them with the green garments of Paradise."',
          source: '(Tirmidhi)',
          desc: 'High-quality blankets and warm clothes are distributed among the helpless people of various regions during severe winter.',
          sectors: [
            'Blanket distribution among destitute people',
            'Providing warm clothes to poor families',
          ],
          ctaTitle: 'Spread warmth among winter-affected people',
          ctaDesc: 'A blanket provided by you can save a precious life.',
        },
        environment: {
          title: 'Tree Plantation Fund',
          quote: '"If a Muslim plants a tree... it will be counted as a charity for them."',
          source: '(Sahih Bukhari)',
          desc: 'Join this project of planting fruit, forest, and medicinal trees across the country to build a green earth.',
          sectors: [
            'Tree plantation beside roads nationwide',
            'Distribution of saplings in educational institutions',
          ],
          ctaTitle: 'Plant a tree to build a green earth',
          ctaDesc: 'Leave a habitable earth for the future generation.',
        },
        medical: {
          title: 'Medical Assistance Fund',
          quote:
            '"The most beloved of people to Allah is the one who brings most benefit to people."',
          source: '(Tabarani)',
          desc: 'Healthcare is provided from this fund to those who cannot afford treatment for critical diseases.',
          sectors: [
            'Assistance in treating critical and expensive diseases',
            'Free medical camps in remote areas',
          ],
          ctaTitle: 'Help save the lives of sick people',
          ctaDesc: 'Your little cooperation can return a healthy life.',
        },
      }, // <-- funds_data এখানে শেষ

      // Gallery Page Translations (funds_data-র বাইরে, যাতে t('gal_...') খুঁজে পায়)
      gal_header_title: 'Photo & Video Gallery',
      gal_header_sub: 'Glimpses of AN-NAS Foundation activities in the field',
      gal_tab_photo: 'Photos',
      gal_tab_video: 'Videos',
      gal_cat_all: 'All',
      gal_cat_flood: 'Flood Relief',
      gal_cat_food: 'Food Distribution',
      gal_cat_empower: 'Self-Reliance',
      gal_cat_qurbani: 'Qurbani',
      gal_cat_winter: 'Winter Clothes Distribution',
      gal_no_media: 'No photos/videos found in this category.',
    },
  },
  bn: {
    translation: {
      nav_home: 'হোম',
      nav_about: 'আমাদের সম্পর্কে',
      nav_activities: 'কার্যক্রম',
      nav_media: 'মিডিয়া',
      nav_gallery: 'গ্যালারি',
      nav_news: 'খবর ও ব্লগ',
      nav_get_involved: 'যুক্ত হোন',
      nav_volunteer: 'স্বেচ্ছাসেবক',
      nav_donate: 'অনুদান দিন',
      nav_contact: 'যোগাযোগ',
      lang_btn: 'English',
      // Home Page Translations
      hero_title_1: 'মানুষের পাশে দাঁড়িয়ে, সুন্দর ভবিষ্যৎ গড়ি',
      hero_desc_1: 'বাংলাদেশের সুবিধাবঞ্চিত ও অসহায় মানুষের সাহায্যে আমাদের সাথে হাত মেলান।',
      btn_donate_now: 'অনুদান দিন',
      btn_join_us: 'যুক্ত হোন',
      hero_title_2: 'ক্ষুধামুক্ত সমাজের উদ্যোগ',
      hero_desc_2: 'কেউ যেন ক্ষুধার্ত অবস্থায় ঘুমাতে না যায়, তা নিশ্চিত করতে আমরা বদ্ধপরিকর।',
      btn_our_work: 'আমাদের কার্যক্রম',

      about_subtitle: 'আমাদের সম্পর্কে',
      about_title: 'মানবতা ও ভালোবাসা ছড়িয়ে দেওয়া',
      about_p1:
        'AN-NAS Welfare Foundation একটি অলাভজনক সংস্থা, যা সমাজে ইতিবাচক পরিবর্তন আনতে নিবেদিত। আমরা বিশ্বাস করি প্রতিটি মানুষেরই আত্মমর্যাদা, আশা এবং মৌলিক অধিকার নিয়ে বাঁচার সুযোগ প্রাপ্য।',
      about_p2:
        'আমাদের স্বেচ্ছাসেবক, দাতা এবং অংশীদারদের ঐকান্তিক প্রচেষ্টায় আমরা সুবিধাবঞ্চিত মানুষের জীবনমান উন্নয়নে এবং একটি সহমর্মী সমাজ গঠনে কাজ করে যাচ্ছি।',
      btn_read_more: 'আরও পড়ুন',

      services_subtitle: 'আমাদের কাজ',
      services_title: 'আমরা কীভাবে সাহায্য করি',
      service_edu_title: 'শিক্ষা সহায়তা',
      service_edu_desc:
        'সুবিধাবঞ্চিত শিশুদের জন্য বই, স্কুলের বেতন এবং প্রয়োজনীয় শিক্ষা উপকরণ প্রদান।',
      service_med_title: 'চিকিৎসা সহায়তা',
      service_med_desc: 'ফ্রি মেডিকেল ক্যাম্প আয়োজন, ঔষধ সরবরাহ এবং স্বাস্থ্যসেবা প্রদান।',
      service_food_title: 'খাদ্য সরবরাহ',
      service_food_desc:
        'ক্ষুধার্তদের মাঝে পুষ্টিকর খাবার বিতরণ এবং রমজানে বিশেষ ইফতারের ব্যবস্থা।',
      service_disaster_title: 'দুর্যোগে ত্রাণ',
      service_disaster_desc: 'বন্যা, ঝড় ও যেকোনো দুর্যোগে জরুরি সহায়তা এবং ত্রাণ সামগ্রী বিতরণ।',

      funds_title: 'অনুদান তহবিল',
      funds_subtitle: 'আসুন একসাথে পরিবর্তন আনি',
      fund_zakat_title: 'যাকাত তহবিল',
      fund_zakat_desc:
        'যাকাত দারিদ্র্য দূরীকরণের অন্যতম মাধ্যম। আপনার যাকাতের ১০০% সঠিক হকদারের কাছে পৌঁছে দেওয়া হয়।',
      fund_regular_title: 'নিয়মিত অনুদান',
      fund_regular_desc:
        'আমাদের চলমান সেবামূলক কার্যক্রম ও ফাউন্ডেশন পরিচালনার ব্যয় মেটাতে নিয়মিত অনুদান দিন।',
      fund_self_title: 'স্বাবলম্বীকরণ তহবিল',
      fund_self_desc:
        'ক্ষুদ্র ব্যবসার মূলধন বা রিকশা প্রদানের মাধ্যমে অসহায় পরিবারগুলোকে স্বাবলম্বী হতে সাহায্য করুন।',
      fund_emergency_title: 'জরুরি ত্রাণ তহবিল',
      fund_emergency_desc:
        'বন্যা বা যেকোনো দুর্যোগে তাৎক্ষণিক সহায়তা ও জরুরি ত্রাণ পৌঁছে দিতে আমাদের পাশে থাকুন।',
      btn_view_all_funds: 'সকল ফান্ড দেখুন',

      activities_title: 'সাম্প্রতিক কার্যক্রম',
      btn_see_all: 'সবগুলো দেখুন',
      btn_see_all_activities: 'সকল কার্যক্রম দেখুন',

      vol_title: 'একজন গর্বিত স্বেচ্ছাসেবক হোন',
      vol_desc:
        'আমাদের নিবেদিত টিমে যোগ দিন এবং দেশের সুবিধাবঞ্চিত মানুষের জীবনে একটি বাস্তব পরিবর্তন আনুন।',
      btn_join_now: 'এখনই যোগ দিন',

      news_title: 'সর্বশেষ খবর ও আপডেট',
      news_update_badge: 'আপডেট',
      btn_read_all_news: 'সকল খবর পড়ুন',
      // About Page Translations
      ab_header_title: 'আমাদের সম্পর্কে',
      ab_header_sub:
        'একটি কল্যাণমূলক সংস্থা হিসেবে আমাদের অনুপ্রেরণামূলক যাত্রা এবং লক্ষ্য সম্পর্কে জানুন, যা বিশ্বে একটি ইতিবাচক প্রভাব ফেলতে প্রতিশ্রুতিবদ্ধ।',
      ab_title: 'আমাদের সম্পর্কে',
      ab_subtitle: 'মানবতা আলিঙ্গন: উষ্ণতা এবং সত্যিকারের সহায়তার গল্প',
      ab_desc:
        'একটি যত্নশীল হৃদয় এবং উন্মুক্ত বাহু নিয়ে, আমরা এমন একটি পরিবেশ তৈরি করার চেষ্টা করি যেখানে মানুষ সান্ত্বনা, সহানুভূতি এবং জীবনের বাধাগুলো কাটিয়ে ওঠার শক্তি খুঁজে পায়। প্রকৃত বন্ধন এবং অটুট আত্মোৎসর্গের মাধ্যমে আমাদের লক্ষ্য হলো একটি ইতিবাচক প্রভাব তৈরি করা, অভাবী মানুষের মুখে হাসি ফোটানো এবং আমাদের সমাজের মধ্যে একাত্মতার অনুভূতি জাগিয়ে তোলা।',
      ab_btn: 'যোগাযোগ করুন',

      stat_1: 'উত্তোলিত অনুদান',
      stat_2: 'জীবন বাঁচানো হয়েছে',
      stat_3: 'কমিউনিটি',
      stat_4: 'লক্ষ্য অর্জিত',

      helped_title: 'এখন পর্যন্ত সাহায্য করেছি',
      feat_1_title: 'মানবতার সেবায়',
      feat_1_desc:
        'শিক্ষা, স্বাস্থ্যসেবা, টেকসই উন্নয়ন এবং জরুরি ত্রাণের মাধ্যমে আমরা একটি ইতিবাচক প্রভাব তৈরি করি। আজই আমাদের সাথে যুক্ত হোন।',
      feat_2_title: 'প্রকৃতিকে ভালোবাসুন',
      feat_2_desc:
        'মানুষকে সচেতন করার মাধ্যমে প্রকৃতির ভারসাম্য রক্ষার্থে পরিবেশের প্রতি ভালোবাসা ও যত্ন নিতে অনুপ্রাণিত করা আমাদের অন্যতম লক্ষ্য।',
      feat_3_title: 'সম্প্রদায়ের ক্ষমতায়ন',
      feat_3_desc:
        'কৌশলগত অংশীদারিত্ব এবং নিবেদিত স্বেচ্ছাসেবকদের মাধ্যমে, আমরা আশ্রয় ও খাবার প্রদান করে জরুরি পরিস্থিতিতে দ্রুত সাড়া দিতে সক্ষম হয়েছি।',

      cert_title: 'অনুমোদন ও প্রশংসাপত্র',
      cert_1_name: 'নিবন্ধন সনদপত্র (Registration Certificate)',
      cert_2_name: 'আইএসও সনদপত্র (ISO Certification)',
      cert_3_name: 'দক্ষতা উন্নয়ন অধিভুক্তি (Skill Development)',
      btn_download: 'ডাউনলোড করুন',

      policy_title: 'আয়-ব্যয়ের নীতিমালা',
      tab_income: 'আয়ের উৎসসমূহ',
      tab_service: 'সেবামূলক ব্যয়',
      tab_management: 'পরিচালনা ব্যয়',

      inc_1: 'ব্যক্তি ও প্রতিষ্ঠান থেকে প্রাপ্ত সাধারণ স্বেচ্ছাধীন অনুদান (সাদাকাহ)।',
      inc_2: 'যোগ্য হকদারদের মাঝে বিতরণের জন্য বিশেষভাবে সংগৃহীত যাকাত তহবিল।',
      inc_3: 'অংশীদার কোম্পানিগুলোর প্রদানকৃত কর্পোরেট সামাজিক দায়বদ্ধতা (CSR) তহবিল।',
      inc_4:
        'নির্দিষ্ট মৌসুমী ক্যাম্পেইনের (যেমন: কুরবানি, শীতবস্ত্র বিতরণ) জন্য সংগৃহীত ডেডিকেটেড ফান্ড।',

      srv_1:
        'অনুদান সম্পূর্ণভাবে ইসলামী শরিয়াহ নীতিমালা এবং দেশের প্রচলিত আইন অনুযায়ী ব্যয় করা হয়।',
      srv_2:
        'যে খাতের জন্য অনুদান দেওয়া হয়, তা কঠোরভাবে শুধুমাত্র সেই খাতেই ব্যয় করা হয়। এক খাতের অর্থ অন্য খাতে স্থানান্তর করা হয় না।',
      srv_3:
        'যাকাত তহবিলের ১০০% অর্থ সঠিক হকদারদের মাঝে বিতরণ করা হয়। যাকাতের অর্থ কখনই পরিচালনার কাজে ব্যবহার করা হয় না; এর জন্য সাধারণ তহবিল ব্যবহৃত হয়।',
      srv_4:
        'প্রতিটি প্রজেক্ট শেষে আন্তর্জাতিক মানদণ্ড অনুসরণ করে আয়-ব্যয়ের বিস্তারিত হিসাব সংরক্ষণ করা হয়।',
      srv_5:
        'বছরে একবার চার্টার্ড একাউন্ট্যান্ট দ্বারা ফাউন্ডেশনের আর্থিক হিসাব অডিট করা হয় এবং রিপোর্ট প্রকাশ করা হয়।',
      srv_6:
        'AN-NAS ফাউন্ডেশনের সকল আর্থিক কার্যক্রম বিশেষজ্ঞ উপদেষ্টাদের সমন্বয়ে গঠিত একটি দলের প্রত্যক্ষ তত্ত্বাবধানে কঠোরভাবে মনিটরিং করা হয়।',

      mgt_1:
        'সুবিধাভোগীদের জন্য সর্বোচ্চ প্রভাব নিশ্চিত করতে পরিচালনা ও প্রশাসনিক খরচ সর্বনিম্ন পর্যায়ে রাখা হয়।',
      mgt_2:
        'কর্মীদের বেতন, অফিস ভাড়া এবং ইউটিলিটি বিল সম্পূর্ণভাবে সাধারণ তহবিল (সাদাকাহ) থেকে পরিশোধ করা হয়, কখনই যাকাত তহবিল থেকে নয়।',
      mgt_3:
        'মার্কেটিং ও প্রচারণামূলক খরচ অপ্টিমাইজ করা হয় এবং প্রাতিষ্ঠানিক তহবিল বাঁচাতে প্রায়ই নির্দিষ্ট শুভাকাঙ্ক্ষীদের দ্বারা স্পন্সর করা হয়।',
      // Contact Page Translations
      contact_header_title: 'যোগাযোগ করুন',
      contact_header_sub:
        'কোনো প্রশ্ন আছে বা আমাদের সাথে যুক্ত হতে চান? আমরা আপনার কথা শুনতে আগ্রহী।',
      contact_info_title: 'যোগাযোগের ঠিকানা',
      contact_info_desc:
        'আপনি দান করতে চান, স্বেচ্ছাসেবক হতে চান বা আমাদের সাথে কাজ করতে চান, নির্দ্বিধায় একটি বার্তা পাঠান বা আমাদের অফিসে আসুন।',
      contact_office: 'অফিসের ঠিকানা',
      contact_office_addr: 'খ-১২/২, (৩য় তলা), প্রগতি সরণি, শাহজাদপুর, গুলশান, ঢাকা-১২১২, বাংলাদেশ',
      contact_phone: 'ফোন নম্বর',
      contact_email: 'ইমেইল ঠিকানা',
      contact_social: 'আমাদের ফলো করুন',
      contact_form_title: 'আমাদের বার্তা পাঠান',
      form_your_name: 'আপনার নাম',
      form_your_phone: 'আপনার ফোন নম্বর',
      form_your_email: 'আপনার ইমেইল',
      form_subject: 'বিষয়',
      form_message: 'আপনার বার্তা এখানে লিখুন...',
      btn_sending: 'পাঠানো হচ্ছে...',
      btn_send_msg: 'বার্তা পাঠান',
      swal_msg_sent: 'বার্তা পাঠানো হয়েছে!',
      swal_msg_failed: 'বার্তা পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      // Activities Page Translations
      act_header_title: 'আমাদের কার্যক্রম',
      act_header_sub:
        'মাঠপর্যায়ে আমাদের নিয়মিত কার্যক্রম এবং প্রজেক্টসমূহের আপডেট। আপনাদের অনুদান কীভাবে মানুষের মুখে হাসি ফোটাচ্ছে তা নিজেই দেখুন।',
      act_btn_read_more: 'বিস্তারিত পড়ুন',
      // Volunteer Page Translations
      vol_header_title: 'স্বেচ্ছাসেবক হোন',
      vol_header_sub:
        'আমাদের নিবেদিত টিমে যোগ দিন এবং সুবিধাবঞ্চিতদের জীবনে একটি বাস্তব পরিবর্তন আনুন।',
      vol_info_title: 'কেন আমাদের সাথে স্বেচ্ছাসেবক হবেন?',
      vol_info_desc1:
        'স্বেচ্ছাসেবক হওয়া মানে শুধু আপনার সময় দেওয়া নয়; এটি হৃদয় থেকে দেওয়ার বিষয়। আপনি যখন <strong>AN-NAS Welfare Foundation</strong>-এ যোগ দেন, তখন আপনি এমন একটি পরিবারের অংশ হন যারা তাদের মুখে হাসি ফোটাতে অক্লান্ত পরিশ্রম করে যারা হাসতে ভুলে গেছে।',
      vol_benefit_1_title: 'জীবনে প্রভাব ফেলুন',
      vol_benefit_1_desc:
        'সরাসরি এমন প্রকল্পগুলোতে অবদান রাখুন যা শিক্ষা, খাদ্য এবং চিকিৎসা সহায়তা প্রদান করে।',
      vol_benefit_2_title: 'শিখুন এবং বড় হোন',
      vol_benefit_2_desc: 'নেতৃত্বের দক্ষতা, দলবদ্ধ কাজ এবং মূল্যবান অভিজ্ঞতা অর্জন করুন।',
      vol_benefit_3_title: 'নেটওয়ার্ক তৈরি করুন',
      vol_benefit_3_desc:
        'এমন সমমনা মানুষের সাথে পরিচিত হোন যারা সমাজকর্মের প্রতি আপনার আবেগ শেয়ার করে।',
      vol_form_title: 'আমাদের টিমে যোগ দিন',
      form_name: 'পুরো নাম *',
      form_name_placeholder: 'যেমন: আব্দুল্লাহ',
      form_phone: 'ফোন নম্বর *',
      form_phone_placeholder: '01XXXXXXXXX',
      form_email: 'ইমেইল ঠিকানা',
      form_email_placeholder: 'example@mail.com',
      form_address: 'বর্তমান ঠিকানা *',
      form_address_placeholder: 'ঢাকা, বাংলাদেশ',
      form_reason: 'কেন আপনি আমাদের সাথে যুক্ত হতে চান? *',
      form_reason_placeholder: 'নিজের সম্পর্কে কিছু বলুন এবং কেন আপনি স্বেচ্ছাসেবক হতে চান...',
      btn_submitting: 'জমা দেওয়া হচ্ছে...',
      btn_submit_app: 'আবেদন জমা দিন',
      swal_success_title: 'আবেদন জমা হয়েছে!',
      swal_success_text: 'আমাদের সাথে স্বেচ্ছাসেবক হিসেবে কাজ করার আগ্রহের জন্য আপনাকে ধন্যবাদ।',
      swal_error_title: 'দুঃখিত...',
      swal_error_text: 'কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
      // Volunteer Page - extra keys (form labels, placeholders, alerts)
      vol_page_sub: 'AN-NAS ওয়েলফেয়ার ফাউন্ডেশনে যোগ দিন এবং পরিবর্তন আনুন।',
      vol_app_form_title: 'আবেদন ফর্ম',
      vol_label_email: 'ইমেইল ঠিকানা (ঐচ্ছিক)',
      vol_label_image: 'প্রোফাইল ছবি (ঐচ্ছিক)',
      vol_label_address: 'বর্তমান ঠিকানা *',
      vol_ph_name: 'আপনার নাম লিখুন',
      vol_ph_phone: 'ফোন নম্বর লিখুন',
      vol_ph_email: 'ইমেইল ঠিকানা লিখুন',
      vol_ph_address: 'আপনার পূর্ণ ঠিকানা লিখুন',
      vol_ph_reason: 'আপনার আগ্রহের কারণ লিখুন...',
      vol_btn_submitting: 'আবেদন জমা দেওয়া হচ্ছে...',
      vol_swal_limit_title: 'সীমা অতিক্রম হয়েছে!',
      vol_swal_limit_text: 'অনেকবার আবেদন জমা দেওয়া হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।',
      vol_swal_error_text: 'আবেদন জমা দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      // Donation Page Translations
      don_header_title: 'অনুদান তহবিল',
      don_header_sub:
        'নির্দিষ্ট খাতে অবদান রাখুন এবং একটি সুন্দর ভবিষ্যৎ গড়তে আমাদের সাহায্য করুন।',
      don_btn: 'বিস্তারিত ও দান করুন',

      f_zakat_title: 'যাকাত তহবিল',
      f_zakat_desc: 'আপনার যাকাতের ১০০% শরিয়াহ মোতাবেক সঠিক হকদারদের মাঝে বিতরণ করা হয়।',
      f_regular_title: 'নিয়মিত অনুদান',
      f_regular_desc:
        'আমাদের চলমান কল্যাণমূলক প্রকল্প এবং আনুষঙ্গিক ব্যয় মেটাতে মাসিক বা নিয়মিত অনুদান দিন।',
      f_qurbani_title: 'সবার জন্য কুরবানী',
      f_qurbani_desc:
        'ঈদুল আযহার সময় হাজারো সুবিধাবঞ্চিত পরিবারকে তাজা গোশত সরবরাহ করতে আমাদের সাহায্য করুন।',
      f_iftar_title: 'ইফতার তহবিল',
      f_iftar_desc: 'রমজান মাসে অভাবী ও পথশিশুদের জন্য পুষ্টিকর ইফতারের ব্যবস্থা করুন।',
      f_edu_title: 'শিক্ষা সহায়তা',
      f_edu_desc: 'দরিদ্র মেধাবী শিক্ষার্থীদের শিক্ষা, বাসস্থান এবং চিকিৎসায় সহায়তা করুন।',
      f_self_title: 'স্বাবলম্বীকরণ তহবিল',
      f_self_desc:
        'ক্ষুদ্র ব্যবসার সরঞ্জাম বা রিকশা প্রদানের মাধ্যমে দরিদ্র পরিবারগুলোকে দারিদ্র্যের চক্র ভাঙতে সাহায্য করুন।',
      f_disaster_title: 'জরুরি দুর্যোগ তহবিল',
      f_disaster_desc:
        'বন্যা, ঘূর্ণিঝড় ও হঠাৎ প্রাকৃতিক দুর্যোগে আক্রান্তদের পাশে দাঁড়ান জরুরি ত্রাণ নিয়ে।',
      f_winter_title: 'শীতবস্ত্র তহবিল',
      f_winter_desc:
        'সারাদেশে কম্বল ও শীতের পোশাক বিতরণের মাধ্যমে দরিদ্র মানুষদের মাঝে উষ্ণতা ছড়িয়ে দিন।',
      f_tree_title: 'বৃক্ষরোপণ তহবিল',
      f_tree_desc:
        'সবুজ পৃথিবী গড়ার এই উদ্যোগে যোগ দিন। ভবিষ্যৎ প্রজন্মের জন্য স্বাস্থ্যকর পরিবেশ গড়তে গাছ লাগান।',
      f_medical_title: 'চিকিৎসা সহায়তা',
      f_medical_desc:
        'যারা চিকিৎসার ব্যয়ভার বহন করতে অক্ষম তাদের জন্য জীবন রক্ষাকারী ঔষধ এবং ফ্রি হেলথ ক্যাম্পের আয়োজন।',
      // Footer Translations
      footer_desc:
        'টেকসই সামাজিক প্রভাব তৈরি করতে এবং সবার জন্য একটি সুন্দর ভবিষ্যৎ গড়তে দয়া, মানবতা এবং সহায়তা ছড়িয়ে দিতে আমরা প্রতিশ্রুতিবদ্ধ।',
      footer_follow_us: 'আমাদের ফলো করুন',
      footer_quick_links: 'গুরুত্বপূর্ণ লিংক',
      footer_contact_info: 'যোগাযোগের তথ্য',
      footer_address: 'খ-১২/২, (৩য় তলা), প্রগতি সরণি, শাহজাদপুর, গুলশান, ঢাকা-১২১২, বাংলাদেশ',
      footer_copyright: '© ২০২৬ AN-NAS Welfare Foundation. সর্বস্বত্ব সংরক্ষিত।',
      // Fund Details Page Translations
      fd_subtitle: 'চলুন একসাথে পরিবর্তন আনি',
      fd_sectors_regular: 'ব্যয়ের খাত',
      fd_sectors_other: 'যে খাতগুলোকে আমরা গুরুত্ব দিই',
      fd_btn_zakat_calc: 'আপনার যাকাত সহজেই হিসাব করুন',
      fd_freq_daily: 'দৈনিক',
      fd_freq_monthly: 'মাসিক',
      fd_other_amount: 'অন্য পরিমাণ',
      fd_amount_label: 'পরিমাণ *',
      fd_amount_ph: '৳ টাকার পরিমাণ',
      fd_name_label: 'আপনার নাম',
      fd_name_ph: 'লিখুন',
      fd_contact_label: 'মোবাইল / ইমেইল *',
      fd_contact_ph: 'লিখুন',
      fd_behalf_label: 'অন্য কারো পক্ষ থেকে দান করে থাকলে তার নাম লিখুন',
      fd_payment_label: 'পেমেন্ট মেথড *',
      fd_next_step: 'পরবর্তী ধাপ',
      fd_pay_methods_title: 'পেমেন্ট করার মাধ্যমসমূহ',
      fd_mobile_banking: 'বিকাশ ও নগদ',
      fd_copied: 'কপি হয়েছে!',
      fd_copy: 'কপি করুন',
      fd_bank_acc_title: 'অফিশিয়াল ব্যাংক অ্যাকাউন্ট',
      fd_bank: 'ব্যাংক:',
      fd_acc_name: 'নাম:',
      fd_acc_no: 'হিসাব নং:',
      fd_branch: 'শাখা:',

      // Zakat Calculator
      fd_zakat_calc_title: 'যাকাত ক্যালকুলেটর',
      fd_zakat_note:
        'নোট: আপনার নিট সম্পদ যদি নিসাব পরিমাণ (প্রায় ৫৯৫ গ্রাম রূপা বা ৮৫ গ্রাম স্বর্ণের সমমূল্য) হয় এবং তা এক বছর স্থায়ী হয়, তবেই যাকাত ফরজ হবে।',
      fd_zakat_assets: 'যাকাতযোগ্য সম্পদ (+)',
      fd_cash: 'হাতে ও ব্যাংকে থাকা নগদ টাকা',
      fd_gold: 'স্বর্ণ ও রূপার বর্তমান বাজারমূল্য',
      fd_investments: 'বিনিয়োগ, শেয়ার বা সঞ্চয়পত্র',
      fd_stock: 'ব্যবসার বিক্রয়যোগ্য পণ্য (স্টক)',
      fd_receivables: 'প্রাপ্য টাকা (যা ফেরত পাওয়ার আশা আছে)',
      fd_liabilities: 'বাদ যাবে এমন ঋণ বা দায় (-)',
      fd_debts: 'আপনার নিজের ঋণ বা ধার (পরিশোধ্য)',
      fd_payable: 'আপনার প্রদেয় যাকাতের পরিমাণ (২.৫%)',
      fd_cancel: 'বাতিল করুন',
      fd_donate_this: 'এই পরিমাণ দান করুন',

      // SweetAlert
      swal_processing: 'প্রক্রিয়াকরণ হচ্ছে...',
      swal_wait: 'অনুগ্রহ করে অপেক্ষা করুন',
      swal_success_title2: 'আলহামদুলিল্লাহ!',
      swal_success_msg:
        'ধন্যবাদ! আপনার অনুদানের তথ্য আমরা পেয়েছি। Transaction ID যাচাই করার পর এটি নিশ্চিত করা হবে।',
      swal_err_title2: 'দুঃখিত!',
      swal_err_msg: 'দয়া করে সবগুলো তথ্য সঠিকভাবে পূরণ করুন।',
      swal_server_err: 'সার্ভার এরর!',
      swal_server_msg: 'লারাভেল সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।',

      // Dynamic Funds Data Object
      funds_data: {
        zakat: {
          title: 'যাকাত তহবিল',
          quote:
            '"তোমরা নামায প্রতিষ্ঠা কর এবং যাকাত দাও। তোমরা নিজের জন্য পূর্বে যে সৎকর্ম প্রেরণ করবে, তা আল্লাহর কাছে পাবে।"',
          source: '(সূরা বাকারা, ১১০)',
          desc: 'যাকাত ইসলামের মৌলিক পাঁচটি স্তম্ভের একটি এবং এটি দরিদ্রদের হক। কুরআনে যাকাত অনাদায়ে কঠোর শাস্তির কথা ঘোষণা করা হয়েছে। যাকাত শুধু একটি ইবাদত নয়, বরং সমাজে অর্থনৈতিক বৈষম্য কমাতে এবং দারিদ্র্য বিমোচনে ভূমিকা রাখে।',
          sectors: [
            'স্বাবলম্বীকরণ প্রকল্প',
            'শিক্ষার্থীদের শিক্ষাবৃত্তি',
            'যাকাতের উপযোগী অন্যান্য শরয়ী খাতসমূহ',
          ],
          ctaTitle: 'আসুন একসাথে হাসি ফোটাই',
          ctaDesc: 'আপনার যাকাত হবে দুস্থ মানুষের উপার্জনের অবলম্বন।',
        },
        general: {
          title: 'নিয়মিত অনুদান',
          quote:
            '"আল্লাহর কাছে সর্বাধিক প্রিয় আমল হলো, যা সদাসর্বদা নিয়মিত করা হয়, যদিও তা অল্প হয়।"',
          source: '(সহীহ বুখারী)',
          desc: 'নিয়মিত অনুদান ফাউন্ডেশনকে টিকিয়ে রাখতে সবচেয়ে বেশি সাহায্য করে।',
          sectors: ['সকল সেবামূলক কার্যক্রম', 'নতুন কার্যক্রমের ব্যয় নির্বাহ'],
          ctaTitle: 'অংশ নিন ফাউন্ডেশনের সকল কল্যাণমূলক কাজে',
          ctaDesc: 'এই খাতে দানের মাধ্যমে ফাউন্ডেশনের সকল কল্যাণমূলক কাজের অংশীদার হতে পারবেন।',
        },
        qurbani: {
          title: 'সবার জন্য কুরবানী',
          quote: '"কুরবানীর পশুর রক্ত মাটিতে পড়ার আগেই তা আল্লাহর দরবারে কবুল হয়ে যায়।"',
          source: '(তিরমিযি)',
          desc: 'সুবিধাবঞ্চিত পরিবার যেন কুরবানীর গোশত থেকে বঞ্চিত না হয়, তাই আপনার অনুদান দিয়ে তাদের মুখে হাসি ফোটাতে পারেন।',
          sectors: ['দেশের প্রত্যন্ত অঞ্চলে গোশত বিতরণ', 'অভাবী ও বিধবাদের মাঝে অগ্রাধিকার'],
          ctaTitle: 'ঈদের আনন্দ ছড়িয়ে দিন',
          ctaDesc: 'আপনার কুরবানীর একটি অংশ অসহায় মানুষের মুখে হাসি ফোটাবে।',
        },
        iftar: {
          title: 'ইফতার তহবিল',
          quote: '"যে ব্যক্তি কোনো রোজাদারকে ইফতার করাবে, সে রোজাদারের সমান সওয়াব পাবে..."',
          source: '(তিরমিযি)',
          desc: 'পবিত্র রমজান মাসে অসহায়, পথশিশু ও ছিন্নমূল মানুষদের জন্য পুষ্টিকর ইফতারের ব্যবস্থা করা হয়।',
          sectors: ['ভাসমান মানুষদের মাঝে ইফতার বিতরণ', 'পথশিশুদের মাঝে ইফতার প্রদান'],
          ctaTitle: 'একজন রোজাদারের ইফতারের দায়িত্ব নিন',
          ctaDesc: 'রমজানের রহমত ভাগ করে নিন সুবিধাবঞ্চিতদের সাথে।',
        },
        education: {
          title: 'শিক্ষা সহায়তা তহবিল',
          quote:
            '"যে ব্যক্তি জ্ঞান অর্জনের জন্য কোনো পথ অবলম্বন করে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।"',
          source: '(সহীহ মুসলিম)',
          desc: 'দারিদ্র্যের কারণে যেন কোনো মেধাবী শিক্ষার্থীর পড়াশোনা বন্ধ না হয়ে যায়, তাই আমরা তাদের মাসিক বৃত্তি দিয়ে সহায়তা করি।',
          sectors: ['মেধাবী শিক্ষার্থীদের মাসিক বৃত্তি', 'মাদ্রাসা ছাত্রদের জন্য বই ও পোশাক'],
          ctaTitle: 'একটি শিশুর শিক্ষার দায়িত্ব নিন',
          ctaDesc: 'আপনার অনুদানে আলোকিত হবে একটি শিশুর ভবিষ্যৎ।',
        },
        'self-reliance': {
          title: 'স্বাবলম্বীকরণ প্রকল্প',
          quote: '"নিজ হাতে কাজ করে খাওয়ার চেয়ে উত্তম খাবার কেউ কখনো খায়নি।"',
          source: '(সহীহ বুখারী)',
          desc: 'আমরা সেলাই মেশিন, রিকশা বা ক্ষুদ্র ব্যবসার মূলধন দিয়ে অসহায় পরিবারগুলোকে স্বাবলম্বী হতে সাহায্য করি।',
          sectors: ['বিধবাদের জন্য সেলাই মেশিন প্রদান', 'ক্ষুদ্র ব্যবসার জন্য আর্থিক সহায়তা'],
          ctaTitle: 'একটি পরিবারকে স্বাবলম্বী করুন',
          ctaDesc: 'আপনার দানে একটি পরিবার পাবে সম্মানের সাথে বাঁচার সুযোগ।',
        },
        disaster: {
          title: 'জরুরি দুর্যোগ তহবিল',
          quote:
            '"যে ব্যক্তি কোনো মুমিনের দুনিয়াবী সংকট দূর করবে, আল্লাহ কিয়ামতের দিন তার সংকট দূর করবেন।"',
          source: '(সহীহ মুসলিম)',
          desc: 'বন্যা, ঘূর্ণিঝড়—যেকোনো আকস্মিক দুর্যোগে দুর্গত মানুষদের পাশে দাঁড়ানোর জন্য আমাদের এই ইমার্জেন্সি ফান্ড ব্যবহার করা হয়।',
          sectors: [
            'দুর্যোগে উদ্ধার কার্যক্রম ও আশ্রয় প্রদান',
            'শুকনা খাবার ও বিশুদ্ধ পানি বিতরণ',
          ],
          ctaTitle: 'দুর্গতদের সাহায্যে এগিয়ে আসুন',
          ctaDesc: 'বিপদের মুহূর্তে অসহায় মানুষের পাশে দাঁড়ান।',
        },
        winter: {
          title: 'শীতবস্ত্র তহবিল',
          quote:
            '"যে ব্যক্তি কোনো বস্ত্রহীনকে কাপড় পরাবে, আল্লাহ তাকে জান্নাতের সবুজ পোশাক পরাবেন।"',
          source: '(তিরমিযি)',
          desc: 'তীব্র শীতে দেশের উত্তরাঞ্চলসহ বিভিন্ন এলাকার অসহায় মানুষের মাঝে উন্নতমানের কম্বল ও গরম কাপড় বিতরণ করা হয়।',
          sectors: [
            'ছিন্নমূল ও ভাসমান মানুষদের মাঝে কম্বল বিতরণ',
            'দরিদ্র পরিবারে গরম কাপড় প্রদান',
          ],
          ctaTitle: 'শীতার্ত মানুষের মাঝে উষ্ণতা ছড়ান',
          ctaDesc: 'আপনার দেওয়া একটি কম্বল বাঁচাতে পারে একটি অমূল্য জীবন।',
        },
        environment: {
          title: 'বৃক্ষরোপণ তহবিল',
          quote: '"কোনো মুসলিম যদি গাছ লাগায়... তবে তা তার জন্য সদকা হিসেবে গণ্য হবে।"',
          source: '(সহীহ বুখারী)',
          desc: 'সবুজ পৃথিবী গড়ার লক্ষ্যে দেশব্যাপী ফলজ, বনজ ও ঔষধি গাছ লাগানোর এই প্রকল্পে অংশ নিন।',
          sectors: ['দেশব্যাপী রাস্তার পাশে বৃক্ষরোপণ', 'শিক্ষাপ্রতিষ্ঠানে চারা বিতরণ'],
          ctaTitle: 'সবুজ পৃথিবী গড়তে একটি গাছ লাগান',
          ctaDesc: 'আগামী প্রজন্মের জন্য একটি বাসযোগ্য পৃথিবী রেখে যান।',
        },
        medical: {
          title: 'চিকিৎসা সহায়তা তহবিল',
          quote:
            '"আল্লাহর বান্দাদের মধ্যে আল্লাহর কাছে সবচেয়ে প্রিয় সেই ব্যক্তি, যে মানুষের সবচেয়ে বেশি উপকার করে।"',
          source: '(তাবারানি)',
          desc: 'অর্থাভাবে যারা জটিল রোগের চিকিৎসা করাতে পারছেন না, এই তহবিল থেকে তাদের স্বাস্থ্যসেবা দেওয়া হয়।',
          sectors: [
            'জটিল ও ব্যয়বহুল রোগের চিকিৎসায় সহায়তা',
            'প্রত্যন্ত অঞ্চলে ফ্রি মেডিকেল ক্যাম্প',
          ],
          ctaTitle: 'অসুস্থ মানুষের জীবন বাঁচাতে সাহায্য করুন',
          ctaDesc: 'আপনার একটু সহযোগিতা ফিরিয়ে দিতে পারে একটি সুস্থ জীবন।',
        },
      }, // <-- funds_data এখানে শেষ

      // Gallery Page Translations (funds_data-র বাইরে, যাতে t('gal_...') খুঁজে পায়)
      gal_header_title: 'ফটো ও ভিডিও গ্যালারি',
      gal_header_sub: 'মাঠপর্যায়ে AN-NAS ফাউন্ডেশনের কার্যক্রমের কিছু দৃশ্যমান চিত্র',
      gal_tab_photo: 'ছবি',
      gal_tab_video: 'ভিডিও',
      gal_cat_all: 'সবগুলো',
      gal_cat_flood: 'বন্যা',
      gal_cat_food: 'খাদ্য বিতরণ',
      gal_cat_empower: 'স্বাবলম্বীকরণ',
      gal_cat_qurbani: 'কুরবানী',
      gal_cat_winter: 'শীতবস্ত্র বিতরণ',
      gal_no_media: 'এই ক্যাটাগরিতে কোনো ছবি/ভিডিও পাওয়া যায়নি।',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
