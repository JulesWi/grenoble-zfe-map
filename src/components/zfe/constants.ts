import { VariableGroup, IndicesMap } from './types';

export const variableGroups: VariableGroup = {
  'Socio-démographie': [
    { key: 'individus', label: 'Individus' },
    { key: 'menages', label: 'Ménages' },
    { key: 'men_pauv', label: 'Ménages pauvres' },
    { key: 'ind_snv', label: 'Niveau de vie' },
    { key: 'men_prop', label: 'Ménages propriétaires' },
    { key: 'men_fmp', label: 'Familles monoparentales' }
  ],
  'Foncier/Bâti': [
    { key: 'BAT_Nombre', label: 'Nombre bâtiments' },
    { key: 'val_foncie', label: 'Valeur foncière' },
    { key: 'VAL_ROUTES', label: 'Densité routière' }
  ],
  'Mobilité (Offre)': [
    { key: 'NBR_BORNE', label: 'Bornes recharge' },
    { key: 'NBR_PARKIN', label: 'Parkings vélos' },
    { key: 'NBR_ARCEAU', label: 'Arceaux vélos' },
    { key: 'NBR_ARRET', label: 'Arrêts bus/tram' },
    { key: 'NBR_ALL_PA', label: 'Places parking auto' },
    { key: 'LONG_PISTE', label: 'Longueur pistes cyclables' }
  ],
  'Accessibilité': [
    { key: 'DIS_ARRET', label: 'Distance arrêts' },
    { key: 'DIS_ALLPAR', label: 'Distance parking auto' },
    { key: 'DIS_BORNES', label: 'Distance bornes' },
    { key: 'DIS_PISTE', label: 'Distance pistes cyclables' },
    { key: 'DIS_VPARKIN', label: 'Distance parking vélo' },
    { key: 'DIS_ARCEAU', label: 'Distance arceaux' }
  ],
  'Services': [
    { key: 'NBR_SERVIC', label: 'Nombre de services' },
    { key: 'DIS_SERVIC', label: 'Distance aux services' }
  ]
};

export const indices: IndicesMap = {
  'EWB': 'Bien-être Économique',
  'SSI': 'Stock d\'Offre',
  'SAI': 'Accessibilité',
  'SAVI': 'Services',
  'SCV': 'Capacité Composite',
  'TPI': 'Pression/Implantation',
  'EVUL': 'Vulnérabilité',
  'GAI': 'Adaptabilité Inverse'
};