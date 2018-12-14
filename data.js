export const unis = [
  { value: 'freie universität', label: 'Freie Universität' },
  { value: 'humboldt universität', label: 'Humboldt Universität' },
  { value: 'technische hochschule', label: 'Technische Hochschule' }
]

export const places = [
  { value: 'berlin', label: 'Berlin' },
  { value: 'münchen', label: 'München' },
  { value: 'dresden', label: 'Dresden' }
]

export const lawAndEconomy = [
  { value: 'betriebswirtschaftslehre', label: 'Betriebswirtschaftslehre', color: '#00B8D9', isFixed: true },
  { value: 'management', label: 'Management', color: '#0052CC', disabled: true },
  { value: 'wirtschaftswissenschaften', label: 'Wirtschaftswissenschaften / VWL', color: '#5243AA' },
  { value: 'wirtschaft', label: 'Wirtschaft und Ingenieurwesen', color: '#FF5630', isFixed: true },
  { value: 'internationale wirtschaft', label: 'Internationale Wirtschaft', color: '#FF8B00' },
  { value: 'rechtswissenschaften', label: 'Rechtswissenschaften', color: '#FFC400' },
  { value: 'tourismus', label: 'Tourismus, Events, Veranstaltungen', color: '#36B37E' },
  { value: 'marketing', label: 'Marketing', color: '#00875A' },
  { value: 'bank', label: 'Bank-Finanz- und Versicherungswesen', color: '#253858' },
  { value: 'verwaltung', label: 'Verwaltung', color: '#666666' },
];

export const teaching = [
  { value: 'grundschule', label: 'Grundschule', rating: 'safe' },
  { value: 'hauptschule', label: 'Hauptschule', rating: 'good' },
  { value: 'mittelschule', label: 'Mittelschule', rating: 'wild' },
  { value: 'gymnasium', label: 'Gymnasium', rating: 'crazy' },
  { value: 'berufsschule', label: 'berufsschule', rating: 'crazy' },
  { value: 'förderschule', label: 'Förderschule', rating: 'crazy' },
];


export const studyDirection = [
  {
    label: 'Rechts- und Wirtschaftswissenschaften, Verwaltung',
    options: lawAndEconomy,
  },
  {
    label: 'Lehrämter',
    options: teaching,
  },
];
