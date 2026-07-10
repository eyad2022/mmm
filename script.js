import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const tableData = [
    { s: "H", en: "Hydrogen", ar: "هيدروجين", w: "1.008", c: 1, r: 1, uses: "وقود الصواريخ، توليد الطاقة، وصناعة الأمونيا.", source: "الغاز الطبيعي والتحليل الكهربائي للماء." },
    { s: "He", en: "Helium", ar: "هيليوم", w: "4.0026", c: 18, r: 1, uses: "تبريد أجهزة الرنين المغناطيسي، المناطيد.", source: "آبار الغاز الطبيعي." },
    { s: "Li", en: "Lithium", ar: "ليثيوم", w: "6.94", c: 1, r: 2, uses: "صناعة البطاريات القابلة للشحن، علاج الأمراض النفسية.", source: "مياه البحيرات الملحية وصخور البيغماتيت." },
    { s: "Be", en: "Beryllium", ar: "بيريليوم", w: "9.012", c: 2, r: 2, uses: "نوافذ الأشعة السينية، أجزاء الطائرات والصواريخ.", source: "معادن البيريل والبرترانديت." },
    { s: "B", en: "Boron", ar: "بورون", w: "10.81", c: 13, r: 2, uses: "زجاج البيركس المقاوم للحرارة، الألياف الزجاجية.", source: "خامات البوراكس والكرنيت." },
    { s: "C", en: "Carbon", ar: "كربون", w: "12.011", c: 14, r: 2, uses: "أساس الحياة، صناعة الصلب، الجرافيت للبطاريات.", source: "الفحم، البترول، الغاز الطبيعي." },
    { s: "N", en: "Nitrogen", ar: "نيتروجين", w: "14.007", c: 15, r: 2, uses: "صناعة الأسمدة، المتفجرات، والتبريد الفائق.", source: "الغلاف الجوي (يشكل 78% من الهواء)." },
    { s: "O", en: "Oxygen", ar: "أكسجين", w: "15.999", c: 16, r: 2, uses: "ضروري للتنفس، اللحام، مؤكسد في وقود الصواريخ.", source: "التقطير التجزيئي للهواء السائل." },
    { s: "F", en: "Fluorine", ar: "فلور", w: "18.998", c: 17, r: 2, uses: "معجون الأسنان، التفلون، وأنظمة التبريد.", source: "معدن الفلوريت." },
    { s: "Ne", en: "Neon", ar: "نيون", w: "20.180", c: 18, r: 2, uses: "الإضاءة واللوحات الإعلانية الساطعة.", source: "الهواء السائل بالتقطير التجزيئي." },
    { s: "Na", en: "Sodium", ar: "صوديوم", w: "22.990", c: 1, r: 3, uses: "ملح الطعام، تبريد المفاعلات النووية.", source: "مياه البحر ومناجم الملح." },
    { s: "Mg", en: "Magnesium", ar: "ماغنيسيوم", w: "24.305", c: 2, r: 3, uses: "سبائك الطائرات، الألعاب النارية.", source: "مياه البحر ومعادن الدولومايت." },
    { s: "Al", en: "Aluminium", ar: "ألومنيوم", w: "26.982", c: 13, r: 3, uses: "صناعة الطائرات، العبوات، النوافذ.", source: "خام البوكسيت." },
    { s: "Si", en: "Silicon", ar: "سيليكون", w: "28.085", c: 14, r: 3, uses: "الرقائق الإلكترونية، الزجاج، الخلايا الشمسية.", source: "رمال الكوارتز." },
    { s: "P", en: "Phosphorus", ar: "فوسفور", w: "30.974", c: 15, r: 3, uses: "الأسمدة الفوسفاتية، أعواد الثقاب.", source: "صخور الفوسفات." },
    { s: "S", en: "Sulfur", ar: "كبريت", w: "32.06", c: 16, r: 3, uses: "حمض الكبريتيك، فلكنة المطاط، البارود.", source: "المناجم، كمنتج ثانوي من تنقية النفط." },
    { s: "Cl", en: "Chlorine", ar: "كلور", w: "35.45", c: 17, r: 3, uses: "تعقيم المياه، البلاستيك (PVC)، المطهرات.", source: "التحليل الكهربائي لكلوريد الصوديوم." },
    { s: "Ar", en: "Argon", ar: "أرجون", w: "39.95", c: 18, r: 3, uses: "تعبئة المصابيح المتوهجة، غاز اللحام.", source: "تقطير الهواء." },
    { s: "K", en: "Potassium", ar: "بوتاسيوم", w: "39.098", c: 1, r: 4, uses: "الأسمدة، صناعة الصابون والزجاج.", source: "معادن السيلفيت والكارناليت." },
    { s: "Ca", en: "Calcium", ar: "كالسيوم", w: "40.078", c: 2, r: 4, uses: "الأسمنت، استخلاص الفلزات، بناء العظام.", source: "الحجر الجيري والجبس." },
    { s: "Sc", en: "Scandium", ar: "سكانديوم", w: "44.956", c: 3, r: 4, uses: "مصابيح الملاعب، إطارات الدراجات العالية الأداء.", source: "خامات التورتفيتيت." },
    { s: "Ti", en: "Titanium", ar: "تيتانيوم", w: "47.867", c: 4, r: 4, uses: "المفاصل الصناعية، الطيران، المجوهرات.", source: "معادن الروتيل والإلمينيت." },
    { s: "V", en: "Vanadium", ar: "فاناديوم", w: "50.942", c: 5, r: 4, uses: "الصلب فائق القوة للأدوات والمحركات.", source: "الكارنوتيت والباترونيت." },
    { s: "Cr", en: "Chromium", ar: "كروم", w: "51.996", c: 6, r: 4, uses: "طلاء السيارات، الفولاذ المقاوم للصدأ.", source: "خام الكروميت." },
    { s: "Mn", en: "Manganese", ar: "منجنيز", w: "54.938", c: 7, r: 4, uses: "تقوية الصلب، البطاريات الجافة.", source: "خام البيرولوزيت." },
    { s: "Fe", en: "Iron", ar: "حديد", w: "55.845", c: 8, r: 4, uses: "أساس صناعة البناء والصلب، الهيموجلوبين.", source: "خامات الهيماتيت والماجنتيت." },
    { s: "Co", en: "Cobalt", ar: "كوبالت", w: "58.933", c: 9, r: 4, uses: "بطاريات الليثيوم، العلاج الإشعاعي.", source: "منتج ثانوي لتعدين النحاس والنيكل." },
    { s: "Ni", en: "Nickel", ar: "نيكل", w: "58.693", c: 10, r: 4, uses: "العملات المعدنية، الفولاذ المقاوم للصدأ.", source: "خامات اللاتيريت." },
    { s: "Cu", en: "Copper", ar: "نحاس", w: "63.546", c: 11, r: 4, uses: "الأسلاك الكهربائية، المحركات والأنابيب.", source: "الكالكوبيريت." },
    { s: "Zn", en: "Zinc", ar: "زنك", w: "65.38", c: 12, r: 4, uses: "جلفنة الحديد لمنع الصدأ، النحاس الأصفر.", source: "خام السفاليريت." },
    { s: "Ga", en: "Gallium", ar: "غاليوم", w: "69.723", c: 13, r: 4, uses: "أشباه الموصلات، الصمامات الثنائية الباعثة للضوء (LED).", source: "كمنتج ثانوي من استخراج الزنك والبوكسيت." },
    { s: "Ge", en: "Germanium", ar: "جرمانيوم", w: "72.630", c: 14, r: 4, uses: "الألياف الضوئية، البصريات تحت الحمراء.", source: "خامات الزنك والفضة." },
    { s: "As", en: "Arsenic", ar: "زرنيخ", w: "74.922", c: 15, r: 4, uses: "حفظ الأخشاب، سبائك الرصاص (بطاريات السيارات).", source: "خامات النحاس والرصاص." },
    { s: "Se", en: "Selenium", ar: "سيلينيوم", w: "78.971", c: 16, r: 4, uses: "الخلايا الكهروضوئية، آلات التصوير (النسخ).", source: "ينتج كمنتج ثانوي من تنقية النحاس." },
    { s: "Br", en: "Bromine", ar: "بروم", w: "79.904", c: 17, r: 4, uses: "مثبطات اللهب، معالجة المياه، وكيماويات التصوير.", source: "يستخرج من مياه البحر والبحيرات الملحية." },
    { s: "Kr", en: "Krypton", ar: "كريبتون", w: "83.798", c: 18, r: 4, uses: "المصابيح الفلورية عالية الأداء، أجهزة الليزر.", source: "التقطير التجزيئي للهواء السائل." },
    { s: "Rb", en: "Rubidium", ar: "روبيديوم", w: "85.468", c: 1, r: 5, uses: "الساعات الذرية الدقيقة، الخلايا الكهروضوئية.", source: "يستخرج من معادن الليبيدوليت." },
    { s: "Sr", en: "Strontium", ar: "سترونتيوم", w: "87.62", c: 2, r: 5, uses: "الألعاب النارية (اللون الأحمر الساطع)، معجون الأسنان الحساسة.", source: "معدني السليستيت والسترونتيانيت." },
    { s: "Y", en: "Yttrium", ar: "إتريوم", w: "88.906", c: 3, r: 5, uses: "شاشات التلفزيون الملونة (الفوسفور الأحمر)، الليزر.", source: "رمال المونازيت والزينوتيم." },
    { s: "Zr", en: "Zirconium", ar: "زركونيوم", w: "91.224", c: 4, r: 5, uses: "تغليف وقود المفاعلات النووية، المجوهرات (الزركون).", source: "يستخرج من رمال الزركون." },
    { s: "Nb", en: "Niobium", ar: "نيوبيوم", w: "92.906", c: 5, r: 5, uses: "المغانط الفائقة التوصيل في أجهزة الرنين المغناطيسي، سبائك الصلب.", source: "معدن الكولومبيت." },
    { s: "Mo", en: "Molybdenum", ar: "موليبدينوم", w: "95.95", c: 6, r: 5, uses: "تقوية الصلب في درجات الحرارة العالية، أجزاء المحركات.", source: "خام الموليبدينيت." },
    { s: "Tc", en: "Technetium", ar: "تكنيتيوم", w: "(98)", c: 7, r: 5, uses: "التصوير الطبي الإشعاعي (نظير تكنيتيوم-99m).", source: "عنصر مشع مصنع، ينتج في المفاعلات النووية." },
    { s: "Ru", en: "Ruthenium", ar: "روثينيوم", w: "101.07", c: 8, r: 5, uses: "تقوية البلاتين والبلاديوم، الوصلات الكهربائية.", source: "كمنتج ثانوي من تنقية خامات البلاتين." },
    { s: "Rh", en: "Rhodium", ar: "روديوم", w: "102.91", c: 9, r: 5, uses: "المحولات الحفازة في عوادم السيارات لتقليل التلوث.", source: "يستخرج مع خامات البلاتين." },
    { s: "Pd", en: "Palladium", ar: "بالاديوم", w: "106.42", c: 10, r: 5, uses: "المحولات الحفازة، المجوهرات (الذهب الأبيض)، وتنقية الهيدروجين.", source: "يوجد مع خامات البلاتين والنيكل." },
    { s: "Ag", en: "Silver", ar: "فضة", w: "107.87", c: 11, r: 5, uses: "المجوهرات، المرايا، الألواح الشمسية، والأجهزة الإلكترونية.", source: "يستخرج من خامات الفضة وأثناء تنقية النحاس والرصاص." },
    { s: "Cd", en: "Cadmium", ar: "كادميوم", w: "112.41", c: 12, r: 5, uses: "بطاريات النيكل-كادميوم، الطلاء الكهربائي لمنع التآكل.", source: "كمنتج ثانوي من تعدين الزنك." },
    { s: "In", en: "Indium", ar: "إنديوم", w: "114.82", c: 13, r: 5, uses: "شاشات اللمس (LCD) والطلاء الشفاف الموصل للكهرباء.", source: "ينتج أثناء معالجة خامات الزنك." },
    { s: "Sn", en: "Tin", ar: "قصدير", w: "118.71", c: 14, r: 5, uses: "طلاء العلب الفولاذية (لحفظ الطعام)، ومعدن اللحام الإلكتروني.", source: "يستخرج بشكل رئيسي من حجر القصدير (الكاسيتريت)." },
    { s: "Sb", en: "Antimony", ar: "إثمد", w: "121.76", c: 15, r: 5, uses: "مقاومات اللهب، سبائك الرصاص للبطاريات، ومستحضرات التجميل قديماً.", source: "خام الستبنيت." },
    { s: "Te", en: "Tellurium", ar: "تيلوريوم", w: "127.60", c: 16, r: 5, uses: "الألواح الشمسية الرقيقة، تحسين قابلية تشغيل النحاس والصلب.", source: "كمنتج ثانوي من تنقية النحاس." },
    { s: "I", en: "Iodine", ar: "يود", w: "126.90", c: 17, r: 5, uses: "المطهرات الطبية، صبغات التصوير، ومهم لغدة الثايرويد في الجسم.", source: "المياه المالحة العميقة ونترات تشيلي." },
    { s: "Xe", en: "Xenon", ar: "زينون", w: "131.29", c: 18, r: 5, uses: "المصابيح الأمامية الساطعة للسيارات، ودوافع الأيونية للأقمار الصناعية.", source: "يستخرج من الهواء بالتقطير التجزيئي." },
    { s: "Cs", en: "Caesium", ar: "سيزيوم", w: "132.91", c: 1, r: 6, uses: "الساعات الذرية الأكثر دقة في العالم، معدات الحفر.", source: "يستخرج من معدن البولوسيت." },
    { s: "Ba", en: "Barium", ar: "باريوم", w: "137.33", c: 2, r: 6, uses: "سوائل حفر الآبار، الألعاب النارية (لون أخضر)، صبغات الأشعة السينية الطبية.", source: "معدن الباريت." },
    { s: "La", en: "Lanthanum", ar: "لانثانوم", w: "138.91", c: 4, r: 9, uses: "عدسات الكاميرات عالية الجودة، بطاريات السيارات الهجينة.", source: "رمال المونازيت والباستنيزيت." },
    { s: "Ce", en: "Cerium", ar: "سيريوم", w: "140.12", c: 5, r: 9, uses: "أحجار القداحات، تلميع الزجاج، والمحولات الحفازة.", source: "رمال المونازيت والباستنيزيت." },
    { s: "Pr", en: "Praseodymium", ar: "براسوديميوم", w: "140.91", c: 6, r: 9, uses: "نظارات لحام القوس، أجزاء محركات الطائرات.", source: "رمال المونازيت والباستنيزيت." },
    { s: "Nd", en: "Neodymium", ar: "نيوديميوم", w: "144.24", c: 7, r: 9, uses: "المغانط القوية جداً (في سماعات الرأس والمحركات الكهربائية).", source: "رمال المونازيت والباستنيزيت." },
    { s: "Pm", en: "Promethium", ar: "بروميثيوم", w: "(145)", c: 8, r: 9, uses: "بطاريات النظائر المشعة للأقمار الصناعية.", source: "عنصر مشع مصنع في المفاعلات." },
    { s: "Sm", en: "Samarium", ar: "ساماريوم", w: "150.36", c: 9, r: 9, uses: "مغانط قوية تعمل في درجات حرارة عالية، أدوية السرطان.", source: "رمال المونازيت." },
    { s: "Eu", en: "Europium", ar: "يوروبيوم", w: "151.96", c: 10, r: 9, uses: "الفوسفور الأحمر والأزرق في الشاشات، مصابيح الفلورسنت.", source: "الباستنيزيت والمونازيت." },
    { s: "Gd", en: "Gadolinium", ar: "جادولينيوم", w: "157.25", c: 11, r: 9, uses: "مواد التباين لأشعة الرنين المغناطيسي، قضبان التحكم في المفاعلات.", source: "المونازيت والباستنيزيت." },
    { s: "Tb", en: "Terbium", ar: "تيربيوم", w: "158.93", c: 12, r: 9, uses: "الأجهزة الصوتية، الشاشات (اللون الأخضر)، المصابيح.", source: "رمال المونازيت." },
    { s: "Dy", en: "Dysprosium", ar: "ديسبروسيوم", w: "162.50", c: 13, r: 9, uses: "أقراص التخزين الصلبة، المغانط في محركات السيارات الكهربائية.", source: "المونازيت والباستنيزيت." },
    { s: "Ho", en: "Holmium", ar: "هولميوم", w: "164.93", c: 14, r: 9, uses: "أقوى المجالات المغناطيسية، أجهزة الليزر الطبية.", source: "المونازيت والجادولينيت." },
    { s: "Er", en: "Erbium", ar: "إربيوم", w: "167.26", c: 15, r: 9, uses: "مضخمات الإشارة في كابلات الألياف الضوئية للإنترنت.", source: "رمال المونازيت." },
    { s: "Tm", en: "Thulium", ar: "ثوليوم", w: "168.93", c: 16, r: 9, uses: "أجهزة الأشعة السينية المحمولة، ليزر العمليات الجراحية.", source: "المونازيت (عنصر نادر جداً)." },
    { s: "Yb", en: "Ytterbium", ar: "إيتربيوم", w: "173.05", c: 17, r: 9, uses: "الساعات الذرية فائقة الدقة، تقوية الفولاذ المقاوم للصدأ.", source: "رمال المونازيت." },
    { s: "Lu", en: "Lutetium", ar: "لوتيتيوم", w: "174.97", c: 18, r: 9, uses: "أجهزة الكشف عن الإشعاع (PET Scanners) في الطب.", source: "المونازيت." },
    { s: "Hf", en: "Hafnium", ar: "هافنيوم", w: "178.49", c: 4, r: 6, uses: "قضبان التحكم في الغواصات النووية، معالجات الكمبيوتر.", source: "يتواجد دائماً مع خامات الزركونيوم." },
    { s: "Ta", en: "Tantalum", ar: "تانتالوم", w: "180.95", c: 5, r: 6, uses: "المكثفات الدقيقة في الهواتف الذكية والأجهزة الإلكترونية.", source: "معدن التانتاليت." },
    { s: "W", en: "Tungsten", ar: "تنجستن", w: "183.84", c: 6, r: 6, uses: "فتائل المصابيح، شفرات القطع، ورؤوس المثاقب لصلابته ومقاومته للحرارة.", source: "خامات الولفراميت والشيليت." },
    { s: "Re", en: "Rhenium", ar: "رينيوم", w: "186.21", c: 7, r: 6, uses: "محركات الطائرات النفاثة، والمزدوجات الحرارية.", source: "كمنتج ثانوي من معالجة الموليبدينوم." },
    { s: "Os", en: "Osmium", ar: "أوزميوم", w: "190.23", c: 8, r: 6, uses: "رؤوس الأقلام الفاخرة، الإبر الدقيقة، والمحاور (أكثف عنصر بالطبيعة).", source: "مع خامات البلاتين." },
    { s: "Ir", en: "Iridium", ar: "إريديوم", w: "192.22", c: 9, r: 6, uses: "شمعات الاحتراق (البواجي)، البوصلات، والصلبان الطبية.", source: "مع خامات البلاتين." },
    { s: "Pt", en: "Platinum", ar: "بلاتين", w: "195.08", c: 10, r: 6, uses: "المجوهرات، المحولات الحفازة للسيارات، أدوية العلاج الكيميائي.", source: "يستخرج كفلز نقي أو مع النيكل." },
    { s: "Au", en: "Gold", ar: "ذهب", w: "196.97", c: 11, r: 6, uses: "المجوهرات، الاحتياطات المالية، الوصلات الإلكترونية الدقيقة لعدم تأكسده.", source: "المناجم ورواسب الأنهار." },
    { s: "Hg", en: "Mercury", ar: "زئبق", w: "200.59", c: 12, r: 6, uses: "مقاييس الحرارة القديمة، مصابيح الفلورسنت، ملغم حشو الأسنان.", source: "يستخرج من خام الزنجفر." },
    { s: "Tl", en: "Thallium", ar: "ثاليوم", w: "204.38", c: 13, r: 6, uses: "تصوير القلب الطبي، والإلكترونيات المتخصصة.", source: "كمنتج ثانوي من خامات النحاس والزنك." },
    { s: "Pb", en: "Lead", ar: "رصاص", w: "207.2", c: 14, r: 6, uses: "بطاريات السيارات، الحماية من الإشعاع (الأشعة السينية)، ذخيرة الأسلحة.", source: "يستخرج من خام الجالينا." },
    { s: "Bi", en: "Bismuth", ar: "بزموت", w: "208.98", c: 15, r: 6, uses: "أدوية المعدة (Pepto-Bismol)، أنظمة إطفاء الحرائق الآلية.", source: "كمنتج ثانوي من معالجة الرصاص والنحاس." },
    { s: "Po", en: "Polonium", ar: "بولونيوم", w: "(209)", c: 16, r: 6, uses: "مولدات الحرارة في المسابر الفضائية، فرش إزالة الكهرباء الساكنة.", source: "عنصر مشع نادر من خامات اليورانيوم." },
    { s: "At", en: "Astatine", ar: "أستاتين", w: "(210)", c: 17, r: 6, uses: "علاج موجه للسرطان بالإشعاع (في طور البحث).", source: "عنصر مشع نادر جداً ينتج من اضمحلال اليورانيوم." },
    { s: "Rn", en: "Radon", ar: "رادون", w: "(222)", c: 18, r: 6, uses: "استخدم قديماً في علاج بعض الأمراض (توقف لخطورته)، ويتتبع للتنبؤ بالزلازل.", source: "غاز مشع ينبعث من التربة والصخور المشعة." },
    { s: "Fr", en: "Francium", ar: "فرانسيوم", w: "(223)", c: 1, r: 7, uses: "لأغراض البحث العلمي فقط (عنصر شديد الإشعاع وسريع الاضمحلال).", source: "ينتج طبيعياً بكميات ضئيلة من تحلل الأكتينيوم." },
    { s: "Ra", en: "Radium", ar: "راديوم", w: "(226)", c: 2, r: 7, uses: "استخدم قديماً في الطلاء المضيء للساعات، وعلاج السرطان.", source: "يستخرج من خامات اليورانيوم (البِتشبلند)." },
    { s: "Ac", en: "Actinium", ar: "أكتينيوم", w: "(227)", c: 4, r: 10, uses: "مصدر للنيوترونات في الأبحاث، وعلاجات إشعاعية مستهدفة.", source: "يوجد بكميات نادرة في خامات اليورانيوم." },
    { s: "Th", en: "Thorium", ar: "ثوريوم", w: "232.04", c: 5, r: 10, uses: "وقود بديل واعد للمفاعلات النووية، عدسات الكاميرات العالية الجودة.", source: "رمال المونازيت." },
    { s: "Pa", en: "Protactinium", ar: "بروتكتينيوم", w: "231.04", c: 6, r: 10, uses: "البحث العلمي وتأريخ الرواسب البحرية القديمة.", source: "ينتج طبيعياً من اضمحلال اليورانيوم." },
    { s: "U", en: "Uranium", ar: "يورانيوم", w: "238.03", c: 7, r: 10, uses: "الوقود الرئيسي للمفاعلات النووية، والأسلحة النووية.", source: "خامات البِتشبلند واليورانينيت." },
    { s: "Np", en: "Neptunium", ar: "نبتونيوم", w: "(237)", c: 8, r: 10, uses: "إنتاج البلوتونيوم في المفاعلات، وأبحاث الكشف عن النيوترونات عالية الطاقة.", source: "مصنع كمنتج ثانوي في المفاعلات النووية." },
    { s: "Pu", en: "Plutonium", ar: "بلوتونيوم", w: "(244)", c: 9, r: 10, uses: "الأسلحة النووية، ومولدات الكهرباء للمركبات الفضائية (مثل كيوريوسيتي).", source: "يصنع عن طريق قذف اليورانيوم بالنيوترونات." },
    { s: "Am", en: "Americium", ar: "أمريسيوم", w: "(243)", c: 10, r: 10, uses: "المستشعر الرئيسي في أجهزة إنذار الدخان المنزلية.", source: "يصنع في المفاعلات النووية." },
    { s: "Cm", en: "Curium", ar: "كوريوم", w: "(247)", c: 11, r: 10, uses: "أجهزة تحليل صخور الكواكب في مسابر الفضاء ومولدات الطاقة.", source: "يصنع بقذف البلوتونيوم بجسيمات ألفا." },
    { s: "Bk", en: "Berkelium", ar: "بيركيليوم", w: "(247)", c: 12, r: 10, uses: "لأغراض البحث العلمي العلمي فقط.", source: "مصنع في مسرعات الجسيمات." },
    { s: "Cf", en: "Californium", ar: "كاليفورنيوم", w: "(251)", c: 13, r: 10, uses: "مصدر قوي للنيوترونات للتنقيب عن النفط، وعلاج أورام معينة.", source: "يصنع في المفاعلات عبر قذف الكوريوم." },
    { s: "Es", en: "Einsteinium", ar: "أينشتاينيوم", w: "(252)", c: 14, r: 10, uses: "البحث العلمي، استخدم لاكتشاف عناصر جديدة.", source: "اكتشف لأول مرة في بقايا انفجار قنبلة هيدروجينية." },
    { s: "Fm", en: "Fermium", ar: "فرميوم", w: "(257)", c: 15, r: 10, uses: "لأغراض البحث العلمي المعملي فقط.", source: "مصنع في المفاعلات النووية الثقيلة." },
    { s: "Md", en: "Mendelevium", ar: "مندليفيوم", w: "(258)", c: 16, r: 10, uses: "لأغراض البحث العلمي، ودراسة الخصائص الكيميائية.", source: "يصنع بقذف أينشتاينيوم بجسيمات ألفا." },
    { s: "No", en: "Nobelium", ar: "نوبليوم", w: "(259)", c: 17, r: 10, uses: "لأغراض البحث العلمي في الفيزياء النووية.", source: "يصنع في مسرعات الجسيمات." },
    { s: "Lr", en: "Lawrencium", ar: "لورنسيوم", w: "(262)", c: 18, r: 10, uses: "لأغراض البحث العلمي فقط.", source: "يصنع بقذف كاليفورنيوم بأيونات البورون." },
    { s: "Rf", en: "Rutherfordium", ar: "رذرفورديوم", w: "(267)", c: 4, r: 7, uses: "أبحاث علمية بحتة لاختبار بنية الذرة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Db", en: "Dubnium", ar: "دوبنيوم", w: "(268)", c: 5, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Sg", en: "Seaborgium", ar: "سيبورجيوم", w: "(271)", c: 6, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Bh", en: "Bohrium", ar: "بوريوم", w: "(272)", c: 7, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Hs", en: "Hassium", ar: "هاسيوم", w: "(270)", c: 8, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Mt", en: "Meitnerium", ar: "مايتنريوم", w: "(276)", c: 9, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Ds", en: "Darmstadtium", ar: "دارمشتاتيوم", w: "(281)", c: 10, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Rg", en: "Roentgenium", ar: "رونتجينيوم", w: "(280)", c: 11, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Cn", en: "Copernicium", ar: "كوبرنيسيوم", w: "(285)", c: 12, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Nh", en: "Nihonium", ar: "نيهونيوم", w: "(284)", c: 13, r: 7, uses: "أبحاث علمية بحتة.", source: "اكتشف في مختبر ريكن باليابان." },
    { s: "Fl", en: "Flerovium", ar: "فليروفيوم", w: "(289)", c: 14, r: 7, uses: "أبحاث علمية ضمن (جزيرة الاستقرار).", source: "مصنع في مركز الأبحاث النووية." },
    { s: "Mc", en: "Moscovium", ar: "موسكوفيوم", w: "(288)", c: 15, r: 7, uses: "أبحاث علمية بحتة.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Lv", en: "Livermorium", ar: "ليفرموريوم", w: "(293)", c: 16, r: 7, uses: "أبحاث علمية بحتة.", source: "اكتشف بالتعاون بين روسيا وأمريكا." },
    { s: "Ts", en: "Tennessine", ar: "تينيسين", w: "(294)", c: 17, r: 7, uses: "أبحاث علمية في مجال الفيزياء النووية.", source: "مصنع عبر مسرعات الجسيمات." },
    { s: "Og", en: "Oganesson", ar: "أوجانيسون", w: "(294)", c: 18, r: 7, uses: "أبحاث علمية لدراسة العناصر فائقة الثقل.", source: "أثقل عنصر معروف، مصنع معملياً." }
];

let camera, scene, renderer, controls;
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;
    scene = new THREE.Scene();

    tableData.forEach((item, i) => {
        const element = document.createElement('div');
        element.className = 'element';
        
        // الألوان بناءً على المجموعات الكيميائية
        let colorVar = '--color-1'; 
        if (item.c === 1 || item.c === 2) colorVar = '--color-2';
        else if (item.c >= 3 && item.c <= 12) colorVar = '--color-4';
        else if (item.c >= 13 && item.c <= 16) colorVar = '--color-3';
        else if (item.c === 17) colorVar = '--color-5';
        else if (item.c === 18) colorVar = '--color-6';
        if (item.r >= 9) colorVar = '--color-7'; 

        element.style.backgroundColor = `var(${colorVar})`;

        element.innerHTML = `
            <div class="header-info">
                <span class="number">${i + 1}</span>
                <span class="weight">${item.w}</span>
            </div>
            <div class="symbol">${item.s}</div>
            <div class="names">${item.en}<br>${item.ar}</div>
            <div class="extra-info">
                <p><strong>الاستخدامات:</strong> ${item.uses}</p>
                <p><strong>المصدر:</strong> ${item.source}</p>
            </div>
        `;

        // إضافة حدث النقر السليم (Click)
        element.addEventListener('click', function (event) {
            // إغلاق كل العناصر الأخرى
            document.querySelectorAll('.element').forEach(el => {
                if (el !== element) {
                    el.classList.remove('is-expanded');
                }
            });
            // تبديل حالة العنصر الحالي
            element.classList.toggle('is-expanded');
        });

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);
        objects.push(objectCSS);

        const objectTable = new THREE.Object3D();
        objectTable.position.x = (item.c * 150) - 1430;
        objectTable.position.y = - (item.r * 190) + 1050;
        targets.table.push(objectTable);
    });

    const vector = new THREE.Vector3();
    
    // تشكيل الكرة
    for ( let i = 0, l = objects.length; i < l; i ++ ) {
        const phi = Math.acos( - 1 + ( 2 * i ) / l );
        const theta = Math.sqrt( l * Math.PI ) * phi;
        const object = new THREE.Object3D();
        object.position.setFromSphericalCoords( 800, phi, theta );
        vector.copy( object.position ).multiplyScalar( 2 );
        object.lookAt( vector );
        targets.sphere.push( object );
    }

    // تشكيل الحلزون
    for ( let i = 0, l = objects.length; i < l; i ++ ) {
        const theta = i * 0.175 + Math.PI;
        const y = - ( i * 8 ) + 450;
        const object = new THREE.Object3D();
        object.position.setFromCylindricalCoords( 900, theta, y );
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt( vector );
        targets.helix.push( object );
    }

    // تشكيل الشبكة
    for ( let i = 0; i < objects.length; i ++ ) {
        const object = new THREE.Object3D();
        object.position.x = ( ( i % 5 ) * 400 ) - 800;
        object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
        object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
        targets.grid.push( object );
    }

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    document.getElementById('table').addEventListener('click', () => transform(targets.table, 2000));
    document.getElementById('sphere').addEventListener('click', () => transform(targets.sphere, 2000));
    document.getElementById('helix').addEventListener('click', () => transform(targets.helix, 2000));
    document.getElementById('grid').addEventListener('click', () => transform(targets.grid, 2000));

    transform(targets.table, 2000);
    window.addEventListener('resize', onWindowResize);
}

function transform(targets, duration) {
    TWEEN.removeAll();
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const target = targets[i];
        
        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
            
        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }
    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}