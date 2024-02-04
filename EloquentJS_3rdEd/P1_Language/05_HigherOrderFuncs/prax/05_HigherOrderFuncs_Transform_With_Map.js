require('./../../../to_ignore/05_HigherOrderFuncs/scripts.js');

let x = `function map(array, transform) {
    let mapped = [];
    for (let element of array) {
      mapped.push(transform(element));
    }
    return mapped;
  }
  
  let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
  console.log(map(rtlScripts, s => s.name));
  // → ["Adlam", "Arabic", "Imperial Aramaic", …]`;

console.log(x);

function map(array, transform) {
    let mapped = [];
    for (let element of array) {
      mapped.push(transform(element));
    }
    return mapped;
  }
  
  let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
  console.log(map(rtlScripts, s => s.name));
  // → ["Adlam", "Arabic", "Imperial Aramaic", …]


  /* 
  [
  'Adlam',                 'Arabic',
  'Imperial Aramaic',      'Avestan',
  'Cypriot',               'Hatran',
  'Hebrew',                'Old Hungarian',
  'Kharoshthi',            'Lydian',
  'Mandaic',               'Manichaean',
  'Mende Kikakui',         'Meroitic Cursive',
  'Meroitic Hieroglyphs',  'Old North Arabian',
  'Nabataean',             'Nko',
  'Old Turkic',            'Palmyrene',
  'Inscriptional Pahlavi', 'Psalter Pahlavi',
  'Phoenician',            'Inscriptional Parthian',
  'Samaritan',             'Old South Arabian',
  'Syriac',                'Thaana'
]
  */
