 export type TDistrictType = {
    id: string;
    name: string;
    bn: string;
}
export const zila = [
  { id: "1", name: "Barguna", bn: "বরগুনা" },
  { id: "2", name: "Barishal", bn: "বরিশাল" },
  { id: "3", name: "Bhola", bn: "ভোলা" },
  { id: "4", name: "Jhalokathi", bn: "ঝালকাঠি" },
  { id: "5", name: "Patuakhali", bn: "পটুয়াখালী" },
  { id: "6", name: "Pirojpur", bn: "পিরোজপুর" },

  { id: "7", name: "Bandarban", bn: "বান্দরবান" },
  { id: "8", name: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া" },
  { id: "9", name: "Chandpur", bn: "চাঁদপুর" },
  { id: "10", name: "Chattogram", bn: "চট্টগ্রাম" },
  { id: "11", name: "Cumilla", bn: "কুমিল্লা" },
  { id: "12", name: "Cox's Bazar", bn: "কক্সবাজার" },
  { id: "13", name: "Feni", bn: "ফেনী" },
  { id: "14", name: "Khagrachhari", bn: "খাগড়াছড়ি" },
  { id: "15", name: "Lakshmipur", bn: "লক্ষ্মীপুর" },
  { id: "16", name: "Noakhali", bn: "নোয়াখালী" },
  { id: "17", name: "Rangamati", bn: "রাঙামাটি" },

  { id: "18", name: "Dhaka", bn: "ঢাকা" },
  { id: "19", name: "Faridpur", bn: "ফরিদপুর" },
  { id: "20", name: "Gazipur", bn: "গাজীপুর" },
  { id: "21", name: "Gopalganj", bn: "গোপালগঞ্জ" },
  { id: "22", name: "Kishoreganj", bn: "কিশোরগঞ্জ" },
  { id: "23", name: "Madaripur", bn: "মাদারীপুর" },
  { id: "24", name: "Manikganj", bn: "মানিকগঞ্জ" },
  { id: "25", name: "Munshiganj", bn: "মুন্সিগঞ্জ" },
  { id: "26", name: "Narayanganj", bn: "নারায়ণগঞ্জ" },
  { id: "27", name: "Narsingdi", bn: "নরসিংদী" },
  { id: "28", name: "Rajbari", bn: "রাজবাড়ি" },
  { id: "29", name: "Shariatpur", bn: "শরীয়তপুর" },
  { id: "30", name: "Tangail", bn: "টাঙ্গাইল" },

  { id: "31", name: "Bagerhat", bn: "বাগেরহাট" },
  { id: "32", name: "Chuadanga", bn: "চুয়াডাঙ্গা" },
  { id: "33", name: "Jashore", bn: "যশোর" },
  { id: "34", name: "Jhenaidah", bn: "ঝিনাইদহ" },
  { id: "35", name: "Khulna", bn: "খুলনা" },
  { id: "36", name: "Kushtia", bn: "কুষ্টিয়া" },
  { id: "37", name: "Magura", bn: "মাগুরা" },
  { id: "38", name: "Meherpur", bn: "মেহেরপুর" },
  { id: "39", name: "Narail", bn: "নড়াইল" },
  { id: "40", name: "Satkhira", bn: "সাতক্ষীরা" },

  { id: "41", name: "Jamalpur", bn: "জামালপুর" },
  { id: "42", name: "Mymensingh", bn: "ময়মনসিংহ" },
  { id: "43", name: "Netrokona", bn: "নেত্রকোণা" },
  { id: "44", name: "Sherpur", bn: "শেরপুর" },

  { id: "45", name: "Bogura", bn: "বগুড়া" },
  { id: "46", name: "Joypurhat", bn: "জয়পুরহাট" },
  { id: "47", name: "Naogaon", bn: "নওগাঁ" },
  { id: "48", name: "Natore", bn: "নাটোর" },
  { id: "49", name: "Chapainawabganj", bn: "চাঁপাইনবাবগঞ্জ" },
  { id: "50", name: "Pabna", bn: "পাবনা" },
  { id: "51", name: "Rajshahi", bn: "রাজশাহী" },
  { id: "52", name: "Sirajganj", bn: "সিরাজগঞ্জ" },

  { id: "53", name: "Dinajpur", bn: "দিনাজপুর" },
  { id: "54", name: "Gaibandha", bn: "গাইবান্ধা" },
  { id: "55", name: "Kurigram", bn: "কুড়িগ্রাম" },
  { id: "56", name: "Lalmonirhat", bn: "লালমনিরহাট" },
  { id: "57", name: "Nilphamari", bn: "নীলফামারী" },
  { id: "58", name: "Panchagarh", bn: "পঞ্চগড়" },
  { id: "59", name: "Rangpur", bn: "রংপুর" },
  { id: "60", name: "Thakurgaon", bn: "ঠাকুরগাঁও" },

  { id: "61", name: "Habiganj", bn: "হবিগঞ্জ" },
  { id: "62", name: "Moulvibazar", bn: "মৌলভীবাজার" },
  { id: "63", name: "Sunamganj", bn: "সুনামগঞ্জ" },
  { id: "64", name: "Sylhet", bn: "সিলেট" },
];


export type TUpazilaType = {
    id: string;
    districtId: string;
    name: string;
    bn: string;
}

export const upozila:TUpazilaType[] = [
  // --- Barguna (id: 1) ---
  { id: "1", districtId: "1", name: "Amtali", bn: "আমতলী" },
  { id: "2", districtId: "1", name: "Bamna", bn: "বামনা" },
  { id: "3", districtId: "1", name: "Barguna Sadar", bn: "বরগুনা সদর" },
  { id: "4", districtId: "1", name: "Betagi", bn: "বেতাগী" },
  { id: "5", districtId: "1", name: "Patharghata", bn: "পাথরঘাটা" },
  { id: "6", districtId: "1", name: "Taltali", bn: "তালতলী" },

  // --- Barishal (id: 2) ---
  { id: "7", districtId: "2", name: "Agailjhara", bn: "আগাইলঝরা" },
  { id: "8", districtId: "2", name: "Babuganj", bn: "বাবুগঞ্জ" },
  { id: "9", districtId: "2", name: "Bakerganj", bn: "বাকেরগঞ্জ" },
  { id: "10", districtId: "2", name: "Banaripara", bn: "বানারীপাড়া" },
  { id: "11", districtId: "2", name: "Gournadi", bn: "গৌরনদী" },
  { id: "12", districtId: "2", name: "Hizla", bn: "হিজলা" },
  { id: "13", districtId: "2", name: "Mehendiganj", bn: "মেহেন্দিগঞ্জ" },
  { id: "14", districtId: "2", name: "Muladi", bn: "মুলাদি" },
  { id: "15", districtId: "2", name: "Wazirpur", bn: "ওয়াজিরপুর" },

  // --- Bhola (id: 3) ---
  { id: "16", districtId: "3", name: "Bhola Sadar", bn: "ভোলা সদর" },
  { id: "17", districtId: "3", name: "Burhanuddin", bn: "বুরহানউদ্দিন" },
  { id: "18", districtId: "3", name: "Char Fasson", bn: "চরফ্যাশন" },
  { id: "19", districtId: "3", name: "Daulatkhan", bn: "দৌলতখান" },
  { id: "20", districtId: "3", name: "Lalmohan", bn: "লালমোহন" },
  { id: "21", districtId: "3", name: "Manpura", bn: "মনপুরা" },
  { id: "22", districtId: "3", name: "Tazumuddin", bn: "তজুমুদ্দিন" },

  // --- Jhalokathi (id: 4) ---
  { id: "23", districtId: "4", name: "Jhalokathi Sadar", bn: "ঝালকাঠি সদর" },
  { id: "24", districtId: "4", name: "Kathalia", bn: "কাঠালিয়া" },
  { id: "25", districtId: "4", name: "Nalchity", bn: "নলছিটি" },
  { id: "26", districtId: "4", name: "Rajapur", bn: "রাজাপুর" },

  // --- Patuakhali (id: 5) ---
  { id: "27", districtId: "5", name: "Bauphal", bn: "বাউফল" },
  { id: "28", districtId: "5", name: "Dashmina", bn: "দশমিনা" },
  { id: "29", districtId: "5", name: "Dumki", bn: "দুমকি" },
  { id: "30", districtId: "5", name: "Galachipa", bn: "গলাচিপা" },
  { id: "31", districtId: "5", name: "Kalapara", bn: "কালাপাড়া" },
  { id: "32", districtId: "5", name: "Mirzaganj", bn: "মির্জাগঞ্জ" },
  { id: "33", districtId: "5", name: "Patuakhali Sadar", bn: "পটুয়াখালী সদর" },
  { id: "34", districtId: "5", name: "Dumki", bn: "দুমকি" },

  // --- Pirojpur (id: 6) ---
  { id: "35", districtId: "6", name: "Bhandaria", bn: "ভান্ডারিয়া" },
  { id: "36", districtId: "6", name: "Kawkhali", bn: "কাউখালী" },
  { id: "37", districtId: "6", name: "Mathbaria", bn: "মঠবাড়িয়া" },
  { id: "38", districtId: "6", name: "Nazirpur", bn: "নাজিরপুর" },
  { id: "39", districtId: "6", name: "Nesarabad (Swarupkathi)", bn: "নেছারাবাদ (স্বরূপকাঠি)" },
  { id: "40", districtId: "6", name: "Pirojpur Sadar", bn: "পিরোজপুর সদর" },
  { id: "41", districtId: "6", name: "Zianagar", bn: "জিয়ানগর" },

  // --- Bandarban (id: 7) ---
  { id: "42", districtId: "7", name: "Alikadam", bn: "আলীকদম" },
  { id: "43", districtId: "7", name: "Bandarban Sadar", bn: "বান্দরবান সদর" },
  { id: "44", districtId: "7", name: "Lama", bn: "লামা" },
  { id: "45", districtId: "7", name: "Naikhongchhari", bn: "নাইক্ষ্যংছড়ি" },
  { id: "46", districtId: "7", name: "Rowangchhari", bn: "রোয়াংছড়ি" },
  { id: "47", districtId: "7", name: "Ruma", bn: "রুমা" },
  { id: "48", districtId: "7", name: "Thanchi", bn: "থানচি" },

  // --- Brahmanbaria (id: 8) ---
  { id: "49", districtId: "8", name: "Akhaura", bn: "আখাউড়া" },
  { id: "50", districtId: "8", name: "Bancharampur", bn: "বাঞ্ছারামপুর" },
  { id: "51", districtId: "8", name: "Bijoynagar", bn: "বিজয়নগর" },
  { id: "52", districtId: "8", name: "Brahmanbaria Sadar", bn: "ব্রাহ্মণবাড়িয়া সদর" },
  { id: "53", districtId: "8", name: "Kasba", bn: "কসবা" },
  { id: "54", districtId: "8", name: "Nabinagar", bn: "নবীনগর" },
  { id: "55", districtId: "8", name: "Nasirnagar", bn: "নাসিরনগর" },
  { id: "56", districtId: "8", name: "Sarail", bn: "সরাইল" },

  // --- Chandpur (id: 9) ---
  { id: "57", districtId: "9", name: "Chandpur Sadar", bn: "চাঁদপুর সদর" },
  { id: "58", districtId: "9", name: "Faridganj", bn: "ফরিদগঞ্জ" },
  { id: "59", districtId: "9", name: "Haimchar", bn: "হাইমচর" },
  { id: "60", districtId: "9", name: "Haziganj", bn: "হাজীগঞ্জ" },
  { id: "61", districtId: "9", name: "Kachua", bn: "কচুয়া" },
  { id: "62", districtId: "9", name: "Matlab North", bn: "মতলব উত্তর" },
  { id: "63", districtId: "9", name: "Matlab South", bn: "মতলব দক্ষিণ" },
  { id: "64", districtId: "9", name: "Shahrasti", bn: "শাহরাস্তি" },

  // --- Chattogram (id: 10) ---
  { id: "65", districtId: "10", name: "Anwara", bn: "আনোয়ারা" },
  { id: "66", districtId: "10", name: "Boalkhali", bn: "বোয়ালখালী" },
  { id: "67", districtId: "10", name: "Chandanaish", bn: "চন্দনাইশ" },
  { id: "68", districtId: "10", name: "Fatikchhari", bn: "ফটিকছড়ি" },
  { id: "69", districtId: "10", name: "Hathazari", bn: "হাটহাজারী" },
  { id: "70", districtId: "10", name: "Lohagara", bn: "লোহাগাড়া" },
  { id: "71", districtId: "10", name: "Mirsharai", bn: "মীরসরাই" },
  { id: "72", districtId: "10", name: "Patiya", bn: "পটিয়া" },
  { id: "73", districtId: "10", name: "Rangunia", bn: "রাঙ্গুনিয়া" },
  { id: "74", districtId: "10", name: "Raozan", bn: "রাউজান" },
  { id: "75", districtId: "10", name: "Sandwip", bn: "সন্দ্বীপ" },
  { id: "76", districtId: "10", name: "Satkania", bn: "সাতকানিয়া" },
  { id: "77", districtId: "10", name: "Sitakunda", bn: "সীতাকুণ্ড" },

  // --- Cumilla (id: 11) ---
  { id: "78", districtId: "11", name: "Barura", bn: "বড়ুরা" },
  { id: "79", districtId: "11", name: "Brahmanpara", bn: "ব্রাহ্মণপাড়া" },
  { id: "80", districtId: "11", name: "Burichang", bn: "বুড়িচং" },
  { id: "81", districtId: "11", name: "Chandina", bn: "চান্দিনা" },
  { id: "82", districtId: "11", name: "Chauddagram", bn: "চৌদ্দগ্রাম" },
  { id: "83", districtId: "11", name: "Cumilla Adarsha Sadar", bn: "কুমিল্লা আদর্শ সদর" },
  { id: "84", districtId: "11", name: "Cumilla Sadar Dakshin", bn: "কুমিল্লা সদর দক্ষিণ" },
  { id: "85", districtId: "11", name: "Daudkandi", bn: "দাউদকান্দি" },
  { id: "86", districtId: "11", name: "Debidwar", bn: "দেবিদ্বার" },
  { id: "87", districtId: "11", name: "Homna", bn: "হোমনা" },
  { id: "88", districtId: "11", name: "Laksam", bn: "লাকসাম" },
  { id: "89", districtId: "11", name: "Meghna", bn: "মেঘনা" },
  { id: "90", districtId: "11", name: "Monohorgonj", bn: "মনোহরগঞ্জ" },
  { id: "91", districtId: "11", name: "Muradnagar", bn: "মুরাদনগর" },
  { id: "92", districtId: "11", name: "Nangalkot", bn: "নাঙ্গলকোট" },
  { id: "93", districtId: "11", name: "Titas", bn: "তিতাস" },

  // --- Cox's Bazar (id: 12) ---
  { id: "94", districtId: "12", name: "Chakaria", bn: "চকরিয়া" },
  { id: "95", districtId: "12", name: "Cox's Bazar Sadar", bn: "কক্সবাজার সদর" },
  { id: "96", districtId: "12", name: "Kutubdia", bn: "কুতুবদিয়া" },
  { id: "97", districtId: "12", name: "Maheshkhali", bn: "মহেশখালী" },
  { id: "98", districtId: "12", name: "Pekua", bn: "পেকুয়া" },
  { id: "99", districtId: "12", name: "Ramu", bn: "রামু" },
  { id: "100", districtId: "12", name: "Teknaf", bn: "টেকনাফ" },
  { id: "101", districtId: "12", name: "Ukhia", bn: "উখিয়া" },

  // --- Feni (id: 13) ---
  { id: "102", districtId: "13", name: "Chhagalnaiya", bn: "ছাগলনাইয়া" },
  { id: "103", districtId: "13", name: "Daganbhuiyan", bn: "দাগনভূঞা" },
  { id: "104", districtId: "13", name: "Feni Sadar", bn: "ফেনী সদর" },
  { id: "105", districtId: "13", name: "Parshuram", bn: "পরশুরাম" },
  { id: "106", districtId: "13", name: "Phulgazi", bn: "ফুলগাজী" },
  { id: "107", districtId: "13", name: "Sonagazi", bn: "সোনাগাজী" },

  // --- Khagrachhari (id: 14) ---
  { id: "108", districtId: "14", name: "Dighinala", bn: "দিঘিনালা" },
  { id: "109", districtId: "14", name: "Khagrachhari Sadar", bn: "খাগড়াছড়ি সদর" },
  { id: "110", districtId: "14", name: "Laxmichhari", bn: "লক্ষীছড়ি" },
  { id: "111", districtId: "14", name: "Mahalchhari", bn: "মহালছড়ি" },
  { id: "112", districtId: "14", name: "Manikchhari", bn: "মানিকছড়ি" },
  { id: "113", districtId: "14", name: "Matiranga", bn: "মাটিরাঙ্গা" },
  { id: "114", districtId: "14", name: "Panchhari", bn: "পানছড়ি" },
  { id: "115", districtId: "14", name: "Ramgarh", bn: "রামগড়" },

  // --- Lakshmipur (id: 15) ---
  { id: "116", districtId: "15", name: "Komolnagar", bn: "কমলনগর" },
  { id: "117", districtId: "15", name: "Lakshmipur Sadar", bn: "লক্ষ্মীপুর সদর" },
  { id: "118", districtId: "15", name: "Ramganj", bn: "রামগঞ্জ" },
  { id: "119", districtId: "15", name: "Ramgati", bn: "রামগতি" },
  { id: "120", districtId: "15", name: "Raipur", bn: "রায়পুর" },

  // --- Noakhali (id: 16) ---
  { id: "121", districtId: "16", name: "Begumganj", bn: "বেগমগঞ্জ" },
  { id: "122", districtId: "16", name: "Chatkhil", bn: "চাটখিল" },
  { id: "123", districtId: "16", name: "Companiganj", bn: "কোম্পানীগঞ্জ" },
  { id: "124", districtId: "16", name: "Hatiya", bn: "হাতিয়া" },
  { id: "125", districtId: "16", name: "Kabirhat", bn: "কবিরহাট" },
  { id: "126", districtId: "16", name: "Senbagh", bn: "সেনবাগ" },
  { id: "127", districtId: "16", name: "Sonaimuri", bn: "সোনাইমুড়ি" },
  { id: "128", districtId: "16", name: "Subarnachar", bn: "সুবর্ণচর" },
  { id: "129", districtId: "16", name: "Noakhali Sadar", bn: "নোয়াখালী সদর" },

  // --- Rangamati (id: 17) ---
  { id: "130", districtId: "17", name: "Baghaichhari", bn: "বাঘাইছড়ি" },
  { id: "131", districtId: "17", name: "Barkal", bn: "বরকল" },
  { id: "132", districtId: "17", name: "Kawkhali", bn: "কাউখালী" },
  { id: "133", districtId: "17", name: "Belaichhari", bn: "বেলাইছড়ি" },
  { id: "134", districtId: "17", name: "Juraichhari", bn: "জুরাইছড়ি" },
  { id: "135", districtId: "17", name: "Langadu", bn: "লংগদু" },
  { id: "136", districtId: "17", name: "Naniarchar", bn: "নানিয়ারচর" },
  { id: "137", districtId: "17", name: "Rajasthali", bn: "রাজস্থলী" },
  { id: "138", districtId: "17", name: "Rangamati Sadar", bn: "রাঙ্গামাটি সদর" },

  // --- Dhaka (id: 18) ---
  { id: "139", districtId: "18", name: "Dhamrai", bn: "ধামরাই" },
  { id: "140", districtId: "18", name: "Dohar", bn: "দোহার" },
  { id: "141", districtId: "18", name: "Keraniganj", bn: "কেরানীগঞ্জ" },
  { id: "142", districtId: "18", name: "Nawabganj", bn: "নবাবগঞ্জ" },
  { id: "143", districtId: "18", name: "Savar", bn: "সাভার" },

  // --- Faridpur (id: 19) ---
  { id: "144", districtId: "19", name: "Alfadanga", bn: "আলফাডাঙ্গা" },
  { id: "145", districtId: "19", name: "Bhanga", bn: "ভাঙ্গা" },
  { id: "146", districtId: "19", name: "Boalmari", bn: "বোয়ালমারী" },
  { id: "147", districtId: "19", name: "Charbhadrasan", bn: "চরভদ্রাসন" },
  { id: "148", districtId: "19", name: "Faridpur Sadar", bn: "ফরিদপুর সদর" },
  { id: "149", districtId: "19", name: "Madhukhali", bn: "মধুখালী" },
  { id: "150", districtId: "19", name: "Nagarkanda", bn: "নগরকান্দা" },
  { id: "151", districtId: "19", name: "Sadarpur", bn: "সদরপুর" },
  { id: "152", districtId: "19", name: "Saltha", bn: "সালথা" },

  // --- Gazipur (id: 20) ---
  { id: "153", districtId: "20", name: "Gazipur Sadar", bn: "গাজীপুর সদর" },
  { id: "154", districtId: "20", name: "Kaliakair", bn: "কালিয়াকৈর" },
  { id: "155", districtId: "20", name: "Kaliganj", bn: "কালীগঞ্জ" },
  { id: "156", districtId: "20", name: "Kapasia", bn: "কাপাসিয়া" },
  { id: "157", districtId: "20", name: "Sreepur", bn: "শ্রীপুর" },

  // --- Gopalganj (id: 21) ---
  { id: "158", districtId: "21", name: "Gopalganj Sadar", bn: "গোপালগঞ্জ সদর" },
  { id: "159", districtId: "21", name: "Kashiani", bn: "কাশিয়ানী" },
  { id: "160", districtId: "21", name: "Kotalipara", bn: "কোটালীপাড়া" },
  { id: "161", districtId: "21", name: "Muksudpur", bn: "মুকসুদপুর" },
  { id: "162", districtId: "21", name: "Tungipara", bn: "টুঙ্গিপাড়া" },

  // --- Kishoreganj (id: 22) ---
  { id: "163", districtId: "22", name: "Austagram", bn: "অষ্টগ্রাম" },
  { id: "164", districtId: "22", name: "Bajitpur", bn: "বাজিতপুর" },
  { id: "165", districtId: "22", name: "Bhairab", bn: "ভৈরব" },
  { id: "166", districtId: "22", name: "Hossainpur", bn: "হোসেনপুর" },
  { id: "167", districtId: "22", name: "Itna", bn: "ইটনা" },
  { id: "168", districtId: "22", name: "Karimganj", bn: "করিমগঞ্জ" },
  { id: "169", districtId: "22", name: "Katiadi", bn: "কটিয়াদি" },
  { id: "170", districtId: "22", name: "Kishoreganj Sadar", bn: "কিশোরগঞ্জ সদর" },
  { id: "171", districtId: "22", name: "Kuliarchar", bn: "কুলিয়ারচর" },
  { id: "172", districtId: "22", name: "Mithamain", bn: "মিঠামইন" },
  { id: "173", districtId: "22", name: "Nikli", bn: "নিকলী" },
  { id: "174", districtId: "22", name: "Pakundia", bn: "পাকুন্দিয়া" },
  { id: "175", districtId: "22", name: "Tarail", bn: "তাড়াইল" },

  // --- Madaripur (id: 23) ---
  { id: "176", districtId: "23", name: "Kalkini", bn: "কালকিনি" },
  { id: "177", districtId: "23", name: "Madaripur Sadar", bn: "মাদারীপুর সদর" },
  { id: "178", districtId: "23", name: "Rajoir", bn: "রাজৈর" },
  { id: "179", districtId: "23", name: "Shibchar", bn: "শিবচর" },

  // --- Manikganj (id: 24) ---
  { id: "180", districtId: "24", name: "Daulatpur", bn: "দৌলতপুর" },
  { id: "181", districtId: "24", name: "Ghior", bn: "ঘিওর" },
  { id: "182", districtId: "24", name: "Harirampur", bn: "হরিরামপুর" },
  { id: "183", districtId: "24", name: "Manikganj Sadar", bn: "মানিকগঞ্জ সদর" },
  { id: "184", districtId: "24", name: "Saturia", bn: "সাটুরিয়া" },
  { id: "185", districtId: "24", name: "Shibalaya", bn: "শিবালয়" },
  { id: "186", districtId: "24", name: "Singair", bn: "সিঙ্গাইর" },

  // --- Munshiganj (id: 25) ---
  { id: "187", districtId: "25", name: "Gazaria", bn: "গজারিয়া" },
  { id: "188", districtId: "25", name: "Lohajang", bn: "লৌহজং" },
  { id: "189", districtId: "25", name: "Munshiganj Sadar", bn: "মুন্সিগঞ্জ সদর" },
  { id: "190", districtId: "25", name: "Sirajdikhan", bn: "সিরাজদিখান" },
  { id: "191", districtId: "25", name: "Sreenagar", bn: "শ্রীনগর" },
  { id: "192", districtId: "25", name: "Tongibari", bn: "টংগিবাড়ি" },

  // --- Narayanganj (id: 26) ---
  { id: "193", districtId: "26", name: "Araihazar", bn: "আড়াইহাজার" },
  { id: "194", districtId: "26", name: "Bandar", bn: "বন্দর" },
  { id: "195", districtId: "26", name: "Narayanganj Sadar", bn: "নারায়ণগঞ্জ সদর" },
  { id: "196", districtId: "26", name: "Rupganj", bn: "রূপগঞ্জ" },
  { id: "197", districtId: "26", name: "Sonargaon", bn: "সোনারগাঁও" },

  // --- Narsingdi (id: 27) ---
  { id: "198", districtId: "27", name: "Belabo", bn: "বেলাবো" },
  { id: "199", districtId: "27", name: "Monohardi", bn: "মনোহরদী" },
  { id: "200", districtId: "27", name: "Narsingdi Sadar", bn: "নরসিংদী সদর" },
  { id: "201", districtId: "27", name: "Palash", bn: "পলাশ" },
  { id: "202", districtId: "27", name: "Raipura", bn: "রায়পুরা" },

  // --- Rajbari (id: 28) ---
  { id: "203", districtId: "28", name: "Baliakandi", bn: "বালিয়াকান্দি" },
  { id: "204", districtId: "28", name: "Goalanda", bn: "গোয়ালন্দ" },
  { id: "205", districtId: "28", name: "Pangsha", bn: "পাংশা" },
  { id: "206", districtId: "28", name: "Rajbari Sadar", bn: "রাজবাড়ী সদর" },

  // --- Shariatpur (id: 29) ---
  { id: "207", districtId: "29", name: "Damudya", bn: "দামুড্যা" },
  { id: "208", districtId: "29", name: "Naria", bn: "নারায়ণগঞ্জ" },
  { id: "209", districtId: "29", name: "Shariatpur Sadar", bn: "শরীয়তপুর সদর" },
  { id: "210", districtId: "29", name: "Bhedarganj", bn: "ভেদরগঞ্জ" },
  { id: "211", districtId: "29", name: "Zajira", bn: "জাজিরা" },

  // --- Tangail (id: 30) ---
  { id: "212", districtId: "30", name: "Bhuapur", bn: "ভুয়াপুর" },
  { id: "213", districtId: "30", name: "Delduar", bn: "দেলদুয়ার" },
  { id: "214", districtId: "30", name: "Dhanbari", bn: "ধনবাড়ী" },
  { id: "215", districtId: "30", name: "Gopalpur", bn: "গোপালপুর" },
  { id: "216", districtId: "30", name: "Kalihati", bn: "কালিহাতী" },
  { id: "217", districtId: "30", name: "Madhupur", bn: "মধুপুর" },
  { id: "218", districtId: "30", name: "Nagarpur", bn: "নাগরপুর" },
  { id: "219", districtId: "30", name: "Sakhipur", bn: "সখিপুর" },
  { id: "220", districtId: "30", name: "Tangail Sadar", bn: "টাঙ্গাইল সদর" },

  // --- Bagerhat (id: 31) ---
  { id: "221", districtId: "31", name: "Bagerhat Sadar", bn: "বাগেরহাট সদর" },
  { id: "222", districtId: "31", name: "Chitalmari", bn: "চিতলমারি" },
  { id: "223", districtId: "31", name: "Fakirhat", bn: "ফকিরহাট" },
  { id: "224", districtId: "31", name: "Kachua", bn: "কচুয়া" },
  { id: "225", districtId: "31", name: "Mollahat", bn: "মোল্লাহাট" },
  { id: "226", districtId: "31", name: "Mongla", bn: "মোংলা" },
  { id: "227", districtId: "31", name: "Rampal", bn: "রামপাল" },
  { id: "228", districtId: "31", name: "Sarankhola", bn: "শরণখোলা" },

  // --- Chuadanga (id: 32) ---
  { id: "229", districtId: "32", name: "Alamdanga", bn: "আলমডাঙ্গা" },
  { id: "230", districtId: "32", name: "Chuadanga Sadar", bn: "চুয়াডাঙ্গা সদর" },
  { id: "231", districtId: "32", name: "Damurhuda", bn: "দামুড়হুদা" },
  { id: "232", districtId: "32", name: "Jibannagar", bn: "জীবননগর" },

  // --- Jashore (id: 33) ---
  { id: "233", districtId: "33", name: "Abhaynagar", bn: "অভয়নগর" },
  { id: "234", districtId: "33", name: "Bagherpara", bn: "বাঘেরপাড়া" },
  { id: "235", districtId: "33", name: "Chaugachha", bn: "চৌগাছা" },
  { id: "236", districtId: "33", name: "Jhikargacha", bn: "ঝিকরগাছা" },
  { id: "237", districtId: "33", name: "Jashore Sadar", bn: "যশোর সদর" },
  { id: "238", districtId: "33", name: "Keshabpur", bn: "কেশবপুর" },
  { id: "239", districtId: "33", name: "Monirampur", bn: "মনিরামপুর" },
  { id: "240", districtId: "33", name: "Sharsha", bn: "শার্শা" },

  // --- Jhenaidah (id: 34) ---
  { id: "241", districtId: "34", name: "Harinakunda", bn: "হরিণাকুন্ডু" },
  { id: "242", districtId: "34", name: "Jhenaidah Sadar", bn: "ঝিনাইদহ সদর" },
  { id: "243", districtId: "34", name: "Kaliganj", bn: "কালীগঞ্জ" },
  { id: "244", districtId: "34", name: "Kotchandpur", bn: "কোটচাঁদপুর" },
  { id: "245", districtId: "34", name: "Maheshpur", bn: "মহেশপুর" },
  { id: "246", districtId: "34", name: "Shailkupa", bn: "সৈলকূপা" },

  // --- Khulna (id: 35) ---
  { id: "247", districtId: "35", name: "Batiaghata", bn: "বটিয়াঘাটা" },
  { id: "248", districtId: "35", name: "Dacope", bn: "ডাকোপ" },
  { id: "249", districtId: "35", name: "Dumuria", bn: "ডুমুরিয়া" },
  { id: "250", districtId: "35", name: "Dighalia", bn: "দিঘলিয়া" },
  { id: "251", districtId: "35", name: "Khalishpur", bn: "খালিশপুর" },
  { id: "252", districtId: "35", name: "Koira", bn: "কয়রা" },
  { id: "253", districtId: "35", name: "Phultala", bn: "ফুলতলা" },
  { id: "254", districtId: "35", name: "Rupsa", bn: "রূপসা" },
  { id: "255", districtId: "35", name: "Terokhada", bn: "তেরখাদা" },
  { id: "256", districtId: "35", name: "Khulna Sadar", bn: "খুলনা সদর" },

  // --- Kushtia (id: 36) ---
  { id: "257", districtId: "36", name: "Bheramara", bn: "ভেড়ামারা" },
  { id: "258", districtId: "36", name: "Khoksa", bn: "খোকসা" },
  { id: "259", districtId: "36", name: "Kumarkhali", bn: "কুমারখালী" },
  { id: "260", districtId: "36", name: "Kushtia Sadar", bn: "কুষ্টিয়া সদর" },
  { id: "261", districtId: "36", name: "Mirpur", bn: "মিরপুর" },

  // --- Magura (id: 37) ---
  { id: "262", districtId: "37", name: "Magura Sadar", bn: "মাগুরা সদর" },
  { id: "263", districtId: "37", name: "Mohammadpur", bn: "মোহাম্মদপুর" },
  { id: "264", districtId: "37", name: "Shalikha", bn: "শালিখা" },
  { id: "265", districtId: "37", name: "Sreepur", bn: "শ্রীপুর" },

  // --- Meherpur (id: 38) ---
  { id: "266", districtId: "38", name: "Meherpur Sadar", bn: "মেহেরপুর সদর" },
  { id: "267", districtId: "38", name: "Gangni", bn: "গাংনী" },
  { id: "268", districtId: "38", name: "Mujibnagar", bn: "মুজিবনগর" },

  // --- Narail (id: 39) ---
  { id: "269", districtId: "39", name: "Narail Sadar", bn: "নড়াইল সদর" },
  { id: "270", districtId: "39", name: "Lohagara", bn: "লোহাগড়া" },
  { id: "271", districtId: "39", name: "Kalia", bn: "কালিয়া" },

  // --- Satkhira (id: 40) ---
  { id: "272", districtId: "40", name: "Assasuni", bn: "আসাসুনি" },
  { id: "273", districtId: "40", name: "Debhata", bn: "দেবহাটা" },
  { id: "274", districtId: "40", name: "Kalaroa", bn: "কালারোয়া" },
  { id: "275", districtId: "40", name: "Kaliganj", bn: "কালীগঞ্জ" },
  { id: "276", districtId: "40", name: "Satkhira Sadar", bn: "সাতক্ষীরা সদর" },
  { id: "277", districtId: "40", name: "Shyamnagar", bn: "শ্যামনগর" },
  { id: "278", districtId: "40", name: "Tala", bn: "তালা" },

  // --- Jamalpur (id: 41) ---
  { id: "279", districtId: "41", name: "Baksiganj", bn: "বাক্সীগঞ্জ" },
  { id: "280", districtId: "41", name: "Dewanganj", bn: "দেওয়ানগঞ্জ" },
  { id: "281", districtId: "41", name: "Islampur", bn: "ইসলামপুর" },
  { id: "282", districtId: "41", name: "Jamalpur Sadar", bn: "জামালপুর সদর" },
  { id: "283", districtId: "41", name: "Madarganj", bn: "মাদারগঞ্জ" },
  { id: "284", districtId: "41", name: "Melandaha", bn: "মেলান্দাহ" },
  { id: "285", districtId: "41", name: "Sarishabari", bn: "সারিশাবাড়ি" },


  // 42. Mymensingh
  { id: "340", districtId: "42", name: "Trishal", bn: "ত্রিশাল" },
  { id: "341", districtId: "42", name: "Bhaluka", bn: "ভালুকা" },
  { id: "342", districtId: "42", name: "Muktagachha", bn: "মুক্তাগাছা" },
  { id: "343", districtId: "42", name: "Nandail", bn: "নান্দাইল" },
  { id: "344", districtId: "42", name: "Gaffargaon", bn: "গফরগাঁও" },
  { id: "345", districtId: "42", name: "Phulpur", bn: "ফুলপুর" },
  { id: "346", districtId: "42", name: "Haluaghat", bn: "হালুয়াঘাট" },
  { id: "347", districtId: "42", name: "Ishwarganj", bn: "ঈশ্বরগঞ্জ" },

  // 43. Netrokona
  { id: "348", districtId: "43", name: "Netrokona Sadar", bn: "নেত্রকোণা সদর" },
  { id: "349", districtId: "43", name: "Khaliajuri", bn: "খালিয়াজুরী" },
  { id: "350", districtId: "43", name: "Durgapur", bn: "দুর্গাপুর" },
  { id: "351", districtId: "43", name: "Kalmakanda", bn: "কালমাকান্দা" },
  { id: "352", districtId: "43", name: "Kendua", bn: "কেন্দুয়া" },
  { id: "353", districtId: "43", name: "Madan", bn: "মদন" },
  { id: "354", districtId: "43", name: "Mohanganj", bn: "মোহনগঞ্জ" },
  { id: "355", districtId: "43", name: "Purbadhala", bn: "পূর্বধলা" },

  // 44. Sherpur
  { id: "356", districtId: "44", name: "Sherpur Sadar", bn: "শেরপুর সদর" },
  { id: "357", districtId: "44", name: "Nakla", bn: "নাকলা" },
  { id: "358", districtId: "44", name: "Nalitabari", bn: "নলিতাবাড়ী" },
  { id: "359", districtId: "44", name: "Sreebardi", bn: "শ্রীবরদী" },

  // 45. Bogura
  { id: "360", districtId: "45", name: "Bogura Sadar", bn: "বগুড়া সদর" },
  { id: "361", districtId: "45", name: "Dhunat", bn: "ধুনট" },
  { id: "362", districtId: "45", name: "Dhupchanchia", bn: "ধূপচঞ্চিয়া" },
  { id: "363", districtId: "45", name: "Gabtali", bn: "গাবতলী" },
  { id: "364", districtId: "45", name: "Kahaloo", bn: "কাহালু" },
  { id: "365", districtId: "45", name: "Nandigram", bn: "নন্দীগ্রাম" },
  { id: "366", districtId: "45", name: "Shibganj", bn: "শিবগঞ্জ" },
  { id: "367", districtId: "45", name: "Sariakandi", bn: "সারিয়াকান্দি" },

  // 46. Joypurhat
  { id: "368", districtId: "46", name: "Joypurhat Sadar", bn: "জয়পুরহাট সদর" },
  { id: "369", districtId: "46", name: "Akkelpur", bn: "আক্কেলপুর" },
  { id: "370", districtId: "46", name: "Kalai", bn: "কালাই" },
  { id: "371", districtId: "46", name: "Khetlal", bn: "ক্ষেতলাল" },
  { id: "372", districtId: "46", name: "Panchbibi", bn: "পাঁচবিবি" },

  // 47. Naogaon
  { id: "373", districtId: "47", name: "Naogaon Sadar", bn: "নওগাঁ সদর" },
  { id: "374", districtId: "47", name: "Atrai", bn: "আত্রাই" },
  { id: "375", districtId: "47", name: "Badalgachhi", bn: "বাদলগাছী" },
  { id: "376", districtId: "47", name: "Manda", bn: "মান্ডা" },
  { id: "377", districtId: "47", name: "Mohadevpur", bn: "মোহাদেবপুর" },
  { id: "378", districtId: "47", name: "Naogaon Sadar", bn: "নওগাঁ সদর" },
  { id: "379", districtId: "47", name: "Niamatpur", bn: "নিয়ামতপুর" },
  { id: "380", districtId: "47", name: "Patnitala", bn: "পাটনিটলা" },
  { id: "381", districtId: "47", name: "Porsha", bn: "পোরশা" },
  { id: "382", districtId: "47", name: "Raninagar", bn: "রাণীনগর" },
  { id: "383", districtId: "47", name: "Sapahar", bn: "সাপাহার" },

  // 48. Natore
  { id: "384", districtId: "48", name: "Natore Sadar", bn: "নাটোর সদর" },
  { id: "385", districtId: "48", name: "Bagatipara", bn: "বাগাতিপাড়া" },
  { id: "386", districtId: "48", name: "Baraigram", bn: "বড়াইগ্রাম" },
  { id: "387", districtId: "48", name: "Gurudaspur", bn: "গুরুদাসপুর" },
  { id: "388", districtId: "48", name: "Lalpur", bn: "লালপুর" },
  { id: "389", districtId: "48", name: "Singra", bn: "সিংড়া" },

  // 49. Chapainawabganj
  { id: "390", districtId: "49", name: "Chapainawabganj Sadar", bn: "চাঁপাইনবাবগঞ্জ সদর" },
  { id: "391", districtId: "49", name: "Gomastapur", bn: "গোমস্তাপুর" },
  { id: "392", districtId: "49", name: "Bholahat", bn: "ভোলাহাট" },
  { id: "393", districtId: "49", name: "Nachole", bn: "নাচোল" },
  { id: "394", districtId: "49", name: "Shibganj", bn: "শিবগঞ্জ" },

  // 50. Pabna
  { id: "395", districtId: "50", name: "Pabna Sadar", bn: "পাবনা সদর" },
  { id: "396", districtId: "50", name: "Atghoria", bn: "আটঘরীয়া" },
  { id: "397", districtId: "50", name: "Bera", bn: "বেড়া" },
  { id: "398", districtId: "50", name: "Bhangura", bn: "ভাঙ্গুড়া" },
  { id: "399", districtId: "50", name: "Chatmohar", bn: "চাটমোহর" },
  { id: "400", districtId: "50", name: "Faridpur", bn: "ফরিদপুর" },
  { id: "401", districtId: "50", name: "Ishwardi", bn: "ঈশ্বরদী" },
  { id: "402", districtId: "50", name: "Santhia", bn: "সাঁথিয়া" },
  { id: "403", districtId: "50", name: "Sujanagar", bn: "সুজানগর" },
  
  // 51. Rajshahi
  { id: "404", districtId: "51", name: "Rajshahi Sadar", bn: "রাজশাহী সদর" },
  { id: "405", districtId: "51", name: "Bagha", bn: "বাঘা" },
  { id: "406", districtId: "51", name: "Bagmara", bn: "বাগমারা" },
  { id: "407", districtId: "51", name: "Charghat", bn: "চারঘাট" },
  { id: "408", districtId: "51", name: "Durgapur", bn: "দুর্গাপুর" },
  { id: "409", districtId: "51", name: "Godagari", bn: "গোদাগাড়ী" },
  { id: "410", districtId: "51", name: "Paba", bn: "পাবা" },
  { id: "411", districtId: "51", name: "Tanore", bn: "তানোর" },

  // 52. Sirajganj
  { id: "412", districtId: "52", name: "Sirajganj Sadar", bn: "সিরাজগঞ্জ সদর" },
  { id: "413", districtId: "52", name: "Kamarkhanda", bn: "কামারখন্দ" },
  { id: "414", districtId: "52", name: "Kazipur", bn: "কাজীপুর" },
  { id: "415", districtId: "52", name: "Raiganj", bn: "রায়গঞ্জ" },
  { id: "416", districtId: "52", name: "Shahjadpur", bn: "শাহজাদপুর" },
  { id: "417", districtId: "52", name: "Tarash", bn: "তারাশ" },
  { id: "418", districtId: "52", name: "Ullahpara", bn: "উল্লাপাড়া" },

  // 53. Dinajpur
  { id: "419", districtId: "53", name: "Dinajpur Sadar", bn: "দিনাজপুর সদর" },
  { id: "420", districtId: "53", name: "Birampur", bn: "বিরামপুর" },
  { id: "421", districtId: "53", name: "Birganj", bn: "বীরগঞ্জ" },
  { id: "422", districtId: "53", name: "Biral", bn: "বিরল" },
  { id: "423", districtId: "53", name: "Phulbari", bn: "ফুলবাড়ী" },
  { id: "424", districtId: "53", name: "Ghoraghat", bn: "ঘোড়াঘাট" },
  { id: "425", districtId: "53", name: "Kaharol", bn: "কাহারোল" },
  { id: "426", districtId: "53", name: "Nawabganj", bn: "নওয়াবগঞ্জ" },
  { id: "427", districtId: "53", name: "Parbatipur", bn: "পরবতীপুর" },

  // 54. Gaibandha
  { id: "428", districtId: "54", name: "Gaibandha Sadar", bn: "গাইবান্ধা সদর" },
  { id: "429", districtId: "54", name: "Sadullapur", bn: "সাদুল্লাপুর" },
  { id: "430", districtId: "54", name: "Saghata", bn: "সাঘাটা" },
  { id: "431", districtId: "54", name: "Palashbari", bn: "পলাশবাড়ী" },
  { id: "432", districtId: "54", name: "Gobindaganj", bn: "গোবিন্দগঞ্জ" },
  { id: "433", districtId: "54", name: "Phulchhari", bn: "ফুলছড়ি" },

  // 55. Kurigram
  { id: "434", districtId: "55", name: "Kurigram Sadar", bn: "কুড়িগ্রাম সদর" },
  { id: "435", districtId: "55", name: "Bhurungamari", bn: "ভুরুঙ্গামারি" },
  { id: "436", districtId: "55", name: "Nageshwari", bn: "নাগেশ্বরী" },
  { id: "437", districtId: "55", name: "Rajarhat", bn: "রাজারহাট" },
  { id: "438", districtId: "55", name: "Ulipur", bn: "উলিপুর" },
  { id: "439", districtId: "55", name: "Phulbari", bn: "ফুলবাড়ী" },

  // 56. Lalmonirhat
  { id: "440", districtId: "56", name: "Lalmonirhat Sadar", bn: "লালমনিরহাট সদর" },
  { id: "441", districtId: "56", name: "Aditmari", bn: "আদিতমারী" },
  { id: "442", districtId: "56", name: "Kaliganj", bn: "কালীগঞ্জ" },
  { id: "443", districtId: "56", name: "Hatibandha", bn: "হাতিবান্ধা" },

  // 57. Nilphamari
  { id: "444", districtId: "57", name: "Nilphamari Sadar", bn: "নীলফামারী সদর" },
  { id: "445", districtId: "57", name: "Dimla", bn: "ডিমলা" },
  { id: "446", districtId: "57", name: "Domar", bn: "ডোমার" },
  { id: "447", districtId: "57", name: "Jaldhaka", bn: "জলঢাকা" },

  // 58. Panchagarh
  { id: "448", districtId: "58", name: "Panchagarh Sadar", bn: "পঞ্চগড় সদর" },
  { id: "449", districtId: "58", name: "Atwari", bn: "আটওয়ারী" },
  { id: "450", districtId: "58", name: "Boda", bn: "বোদা" },
  { id: "451", districtId: "58", name: "Debiganj", bn: "দেবীগঞ্জ" },

  // 59. Rangpur
  { id: "452", districtId: "59", name: "Rangpur Sadar", bn: "রংপুর সদর" },
  { id: "453", districtId: "59", name: "Badarganj", bn: "বাদারগঞ্জ" },
  { id: "454", districtId: "59", name: "Mithapukur", bn: "মিঠাপুকুর" },
  { id: "455", districtId: "59", name: "Pirganj", bn: "পীরগঞ্জ" },
  { id: "456", districtId: "59", name: "Kaunia", bn: "কাউনিয়া" },
  { id: "457", districtId: "59", name: "Gangachhara", bn: "গংগাচড়া" },
  { id: "458", districtId: "59", name: "Taraganj", bn: "তারাগঞ্জ" },

  // 60. Thakurgaon
  { id: "459", districtId: "60", name: "Thakurgaon Sadar", bn: "ঠাকুরগাঁও সদর" },
  { id: "460", districtId: "60", name: "Pirganj", bn: "পীরগঞ্জ" },
  { id: "461", districtId: "60", name: "Ranisankail", bn: "রাণীশংকৈল" },
  { id: "462", districtId: "60", name: "Haripur", bn: "হরিপুর" },

  // 61. Habiganj
  { id: "463", districtId: "61", name: "Habiganj Sadar", bn: "হবিগঞ্জ সদর" },
  { id: "464", districtId: "61", name: "Ajmiriganj", bn: "আজমিরীগঞ্জ" },
  { id: "465", districtId: "61", name: "Bahubal", bn: "বাহুবল" },
  { id: "466", districtId: "61", name: "Baniachong", bn: "বানিয়াচং" },
  { id: "467", districtId: "61", name: "Chunarughat", bn: "চুনারুঘাট" },

  // 62. Moulvibazar
  { id: "468", districtId: "62", name: "Moulvibazar Sadar", bn: "মৌলভীবাজার সদর" },
  { id: "469", districtId: "62", name: "Kulaura", bn: "কুলাউড়া" },
  { id: "470", districtId: "62", name: "Juri", bn: "জুড়ি" },
  { id: "471", districtId: "62", name: "Rajnagar", bn: "রাজনগর" },
  { id: "472", districtId: "62", name: "Sreemangal", bn: "স্রীমঙ্গল" },

  // 63. Sunamganj
  { id: "473", districtId: "63", name: "Sunamganj Sadar", bn: "সুনামগঞ্জ সদর" },
  { id: "474", districtId: "63", name: "Chhatak", bn: "ছাতক" },
  { id: "475", districtId: "63", name: "Derai", bn: "দিরাই" },
  { id: "476", districtId: "63", name: "Dowarabazar", bn: "দোয়ারাবাজার" },
  { id: "477", districtId: "63", name: "Jagannathpur", bn: "জগন্নাথপুর" },
  { id: "478", districtId: "63", name: "Shalla", bn: "শাল্লা" },
  { id: "479", districtId: "63", name: "Sullah", bn: "সুল্লা" },
  { id: "480", districtId: "63", name: "Sunamganj Sadar", bn: "সুনামগঞ্জ সদর" },
  { id: "481", districtId: "63", name: "Tahirpur", bn: "তাহিরপুর" },

  // 64. Sylhet
  { id: "482", districtId: "64", name: "Sylhet Sadar", bn: "সিলেট সদর" },
  { id: "483", districtId: "64", name: "Beanibazar", bn: "বিয়ানীবাজার" },
  { id: "484", districtId: "64", name: "Balaganj", bn: "বালাগঞ্জ" },
  { id: "485", districtId: "64", name: "Bishwanath", bn: "বিশ্বনাথ" },
  { id: "486", districtId: "64", name: "Companiganj", bn: "কোম্পানীগঞ্জ" },
  { id: "487", districtId: "64", name: "Fenchuganj", bn: "ফেঞ্চুগঞ্জ" },
  { id: "488", districtId: "64", name: "Golapganj", bn: "গোলাপগঞ্জ" },
  { id: "489", districtId: "64", name: "Gowainghat", bn: "গোয়াইনঘাট" },
  { id: "490", districtId: "64", name: "Jaintiapur", bn: "জৈন্তাপুর" }
];

