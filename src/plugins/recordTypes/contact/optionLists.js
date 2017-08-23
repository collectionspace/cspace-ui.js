import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  emailTypes: {
    values: [
      'business',
      'personal',
      'other',
    ],
    messages: defineMessages({
      business: {
        id: 'option.emailTypes.business',
        defaultMessage: 'business',
      },
      personal: {
        id: 'option.emailTypes.personal',
        defaultMessage: 'personal',
      },
      other: {
        id: 'option.emailTypes.other',
        defaultMessage: 'other',
      },
    }),
  },
  telephoneNumberTypes: {
    values: [
      'business',
      'home',
      'mobile',
      'other',
    ],
    messages: defineMessages({
      business: {
        id: 'option.telephoneNumberTypes.business',
        defaultMessage: 'business',
      },
      personal: {
        id: 'option.telephoneNumberTypes.home',
        defaultMessage: 'home',
      },
      mobile: {
        id: 'option.telephoneNumberTypes.mobile',
        defaultMessage: 'mobile',
      },
      other: {
        id: 'option.telephoneNumberTypes.other',
        defaultMessage: 'other',
      },
    }),
  },
  faxNumberTypes: {
    values: [
      'business',
      'home',
      'other',
    ],
    messages: defineMessages({
      business: {
        id: 'option.faxNumberTypes.business',
        defaultMessage: 'business',
      },
      personal: {
        id: 'option.faxNumberTypes.home',
        defaultMessage: 'home',
      },
      other: {
        id: 'option.faxNumberTypes.other',
        defaultMessage: 'other',
      },
    }),
  },
  webAddressTypes: {
    values: [
      'business',
      'personal',
      'other',
    ],
    messages: defineMessages({
      business: {
        id: 'option.webAddressTypes.business',
        defaultMessage: 'business',
      },
      personal: {
        id: 'option.webAddressTypes.personal',
        defaultMessage: 'personal',
      },
      other: {
        id: 'option.webAddressTypes.other',
        defaultMessage: 'other',
      },
    }),
  },
  addressTypes: {
    values: [
      'business',
      'personal',
      'other',
    ],
    messages: defineMessages({
      business: {
        id: 'option.addressTypes.business',
        defaultMessage: 'business',
      },
      personal: {
        id: 'option.addressTypes.personal',
        defaultMessage: 'personal',
      },
      other: {
        id: 'option.addressTypes.other',
        defaultMessage: 'other',
      },
    }),
  },
  addressCountries: {
    // Options conform to ISO-3166-1 List of Countries Codes, available free of charge for
    // "non-commercial purposes." See http://www.iso.org/iso/country_codes.htm and
    // http://www.iso.org/iso/home/standards/country_codes/country_names_and_code_elements_txt.htm
    values: [
      'AX',
      'AF',
      'AL',
      'DZ',
      'AS',
      'AD',
      'AO',
      'AI',
      'AQ',
      'AG',
      'AR',
      'AM',
      'AW',
      'AU',
      'AT',
      'AZ',
      'BS',
      'BH',
      'BD',
      'BB',
      'BY',
      'BE',
      'BZ',
      'BJ',
      'BM',
      'BT',
      'BO',
      'BQ',
      'BA',
      'BW',
      'BV',
      'BR',
      'IO',
      'BN',
      'BG',
      'BF',
      'BI',
      'KH',
      'CM',
      'CA',
      'CV',
      'KY',
      'CF',
      'TD',
      'CL',
      'CN',
      'CX',
      'CC',
      'CO',
      'KM',
      'CG',
      'CD',
      'CK',
      'CR',
      'CI',
      'HR',
      'CU',
      'CW',
      'CY',
      'CZ',
      'DK',
      'DJ',
      'DM',
      'DO',
      'EC',
      'EG',
      'SV',
      'GQ',
      'ER',
      'EE',
      'ET',
      'FK',
      'FO',
      'FJ',
      'FI',
      'FR',
      'GF',
      'PF',
      'TF',
      'GA',
      'GM',
      'GE',
      'DE',
      'GH',
      'GI',
      'GR',
      'GL',
      'GD',
      'GP',
      'GU',
      'GT',
      'GG',
      'GN',
      'GW',
      'GY',
      'HT',
      'HM',
      'VA',
      'HN',
      'HK',
      'HU',
      'IS',
      'IN',
      'ID',
      'IR',
      'IQ',
      'IE',
      'IM',
      'IL',
      'IT',
      'JM',
      'JP',
      'JE',
      'JO',
      'KZ',
      'KE',
      'KI',
      'KP',
      'KR',
      'KW',
      'KG',
      'LA',
      'LV',
      'LB',
      'LS',
      'LR',
      'LY',
      'LI',
      'LT',
      'LU',
      'MO',
      'MK',
      'MG',
      'MW',
      'MY',
      'MV',
      'ML',
      'MT',
      'MH',
      'MQ',
      'MR',
      'MU',
      'YT',
      'MX',
      'FM',
      'MD',
      'MC',
      'MN',
      'ME',
      'MS',
      'MA',
      'MZ',
      'MM',
      'NA',
      'NR',
      'NP',
      'NL',
      'NC',
      'NZ',
      'NI',
      'NE',
      'NG',
      'NU',
      'NF',
      'MP',
      'NO',
      'OM',
      'PK',
      'PW',
      'PS',
      'PA',
      'PG',
      'PY',
      'PE',
      'PH',
      'PN',
      'PL',
      'PT',
      'PR',
      'QA',
      'RE',
      'RO',
      'RU',
      'RW',
      'BL',
      'SH',
      'KN',
      'LC',
      'MF',
      'PM',
      'VC',
      'WS',
      'SM',
      'ST',
      'SA',
      'SN',
      'RS',
      'SC',
      'SL',
      'SG',
      'SX',
      'SK',
      'SI',
      'SB',
      'SO',
      'ZA',
      'GS',
      'SS',
      'ES',
      'LK',
      'SD',
      'SR',
      'SJ',
      'SZ',
      'SE',
      'CH',
      'SY',
      'TW',
      'TJ',
      'TZ',
      'TH',
      'TL',
      'TG',
      'TK',
      'TO',
      'TT',
      'TN',
      'TR',
      'TM',
      'TC',
      'TV',
      'UG',
      'UA',
      'AE',
      'GB',
      'US',
      'UM',
      'UY',
      'UZ',
      'VU',
      'VE',
      'VN',
      'VG',
      'VI',
      'WF',
      'EH',
      'YE',
      'ZM',
      'ZW',
    ],
    messages: defineMessages({
      AF: {
        id: 'option.addressCountries.AF',
        defaultMessage: 'Afghanistan',
      },
      AX: {
        id: 'option.addressCountries.AX',
        defaultMessage: 'Åland Islands',
      },
      AL: {
        id: 'option.addressCountries.AL',
        defaultMessage: 'Albania',
      },
      DZ: {
        id: 'option.addressCountries.DZ',
        defaultMessage: 'Algeria',
      },
      AS: {
        id: 'option.addressCountries.AS',
        defaultMessage: 'American Samoa',
      },
      AD: {
        id: 'option.addressCountries.AD',
        defaultMessage: 'Andorra',
      },
      AO: {
        id: 'option.addressCountries.AO',
        defaultMessage: 'Angola',
      },
      AI: {
        id: 'option.addressCountries.AI',
        defaultMessage: 'Anguilla',
      },
      AQ: {
        id: 'option.addressCountries.AQ',
        defaultMessage: 'Antarctica',
      },
      AG: {
        id: 'option.addressCountries.AG',
        defaultMessage: 'Antigua and Barbuda',
      },
      AR: {
        id: 'option.addressCountries.AR',
        defaultMessage: 'Argentina',
      },
      AM: {
        id: 'option.addressCountries.AM',
        defaultMessage: 'Armenia',
      },
      AW: {
        id: 'option.addressCountries.AW',
        defaultMessage: 'Aruba',
      },
      AU: {
        id: 'option.addressCountries.AU',
        defaultMessage: 'Australia',
      },
      AT: {
        id: 'option.addressCountries.AT',
        defaultMessage: 'Austria',
      },
      AZ: {
        id: 'option.addressCountries.AZ',
        defaultMessage: 'Azerbaijan',
      },
      BS: {
        id: 'option.addressCountries.BS',
        defaultMessage: 'Bahamas (the)',
      },
      BH: {
        id: 'option.addressCountries.BH',
        defaultMessage: 'Bahrain',
      },
      BD: {
        id: 'option.addressCountries.BD',
        defaultMessage: 'Bangladesh',
      },
      BB: {
        id: 'option.addressCountries.BB',
        defaultMessage: 'Barbados',
      },
      BY: {
        id: 'option.addressCountries.BY',
        defaultMessage: 'Belarus',
      },
      BE: {
        id: 'option.addressCountries.BE',
        defaultMessage: 'Belgium',
      },
      BZ: {
        id: 'option.addressCountries.BZ',
        defaultMessage: 'Belize',
      },
      BJ: {
        id: 'option.addressCountries.BJ',
        defaultMessage: 'Benin',
      },
      BM: {
        id: 'option.addressCountries.BM',
        defaultMessage: 'Bermuda',
      },
      BT: {
        id: 'option.addressCountries.BT',
        defaultMessage: 'Bhutan',
      },
      BO: {
        id: 'option.addressCountries.BO',
        defaultMessage: 'Bolivia (Plurinational State of)',
      },
      BQ: {
        id: 'option.addressCountries.BQ',
        defaultMessage: 'Bonaire, Sint Eustatius and Saba',
      },
      BA: {
        id: 'option.addressCountries.BA',
        defaultMessage: 'Bosnia and Herzegovina',
      },
      BW: {
        id: 'option.addressCountries.BW',
        defaultMessage: 'Botswana',
      },
      BV: {
        id: 'option.addressCountries.BV',
        defaultMessage: 'Bouvet Island',
      },
      BR: {
        id: 'option.addressCountries.BR',
        defaultMessage: 'Brazil',
      },
      IO: {
        id: 'option.addressCountries.IO',
        defaultMessage: 'British Indian Ocean Territory (the)',
      },
      BN: {
        id: 'option.addressCountries.BN',
        defaultMessage: 'Brunei Darussalam',
      },
      BG: {
        id: 'option.addressCountries.BG',
        defaultMessage: 'Bulgaria',
      },
      BF: {
        id: 'option.addressCountries.BF',
        defaultMessage: 'Burkina Faso',
      },
      BI: {
        id: 'option.addressCountries.BI',
        defaultMessage: 'Burundi',
      },
      KH: {
        id: 'option.addressCountries.KH',
        defaultMessage: 'Cambodia',
      },
      CM: {
        id: 'option.addressCountries.CM',
        defaultMessage: 'Cameroon',
      },
      CA: {
        id: 'option.addressCountries.CA',
        defaultMessage: 'Canada',
      },
      CV: {
        id: 'option.addressCountries.CV',
        defaultMessage: 'Cape Verde',
      },
      KY: {
        id: 'option.addressCountries.KY',
        defaultMessage: 'Cayman Islands (the)',
      },
      CF: {
        id: 'option.addressCountries.CF',
        defaultMessage: 'Central African Republic (the)',
      },
      TD: {
        id: 'option.addressCountries.TD',
        defaultMessage: 'Chad',
      },
      CL: {
        id: 'option.addressCountries.CL',
        defaultMessage: 'Chile',
      },
      CN: {
        id: 'option.addressCountries.CN',
        defaultMessage: 'China',
      },
      CX: {
        id: 'option.addressCountries.CX',
        defaultMessage: 'Christmas Island',
      },
      CC: {
        id: 'option.addressCountries.CC',
        defaultMessage: 'Cocos (Keeling) Islands (the)',
      },
      CO: {
        id: 'option.addressCountries.CO',
        defaultMessage: 'Colombia',
      },
      KM: {
        id: 'option.addressCountries.KM',
        defaultMessage: 'Comoros (the)',
      },
      CG: {
        id: 'option.addressCountries.CG',
        defaultMessage: 'Congo (the)',
      },
      CD: {
        id: 'option.addressCountries.CD',
        defaultMessage: 'Congo (the Democratic Republic of the)',
      },
      CK: {
        id: 'option.addressCountries.CK',
        defaultMessage: 'Cook Islands (the)',
      },
      CR: {
        id: 'option.addressCountries.CR',
        defaultMessage: 'Costa Rica',
      },
      CI: {
        id: 'option.addressCountries.CI',
        defaultMessage: 'Côte d\'Ivoire',
      },
      HR: {
        id: 'option.addressCountries.HR',
        defaultMessage: 'Croatia',
      },
      CU: {
        id: 'option.addressCountries.CU',
        defaultMessage: 'Cuba',
      },
      CW: {
        id: 'option.addressCountries.CW',
        defaultMessage: 'Curaçao',
      },
      CY: {
        id: 'option.addressCountries.CY',
        defaultMessage: 'Cyprus',
      },
      CZ: {
        id: 'option.addressCountries.CZ',
        defaultMessage: 'Czechia',
      },
      DK: {
        id: 'option.addressCountries.DK',
        defaultMessage: 'Denmark',
      },
      DJ: {
        id: 'option.addressCountries.DJ',
        defaultMessage: 'Djibouti',
      },
      DM: {
        id: 'option.addressCountries.DM',
        defaultMessage: 'Dominica',
      },
      DO: {
        id: 'option.addressCountries.DO',
        defaultMessage: 'Dominican Republic (the)',
      },
      EC: {
        id: 'option.addressCountries.EC',
        defaultMessage: 'Ecuador',
      },
      EG: {
        id: 'option.addressCountries.EG',
        defaultMessage: 'Egypt',
      },
      SV: {
        id: 'option.addressCountries.SV',
        defaultMessage: 'El Salvador',
      },
      GQ: {
        id: 'option.addressCountries.GQ',
        defaultMessage: 'Equatorial Guinea',
      },
      ER: {
        id: 'option.addressCountries.ER',
        defaultMessage: 'Eritrea',
      },
      EE: {
        id: 'option.addressCountries.EE',
        defaultMessage: 'Estonia',
      },
      ET: {
        id: 'option.addressCountries.ET',
        defaultMessage: 'Ethiopia',
      },
      FK: {
        id: 'option.addressCountries.FK',
        defaultMessage: 'Falkland Islands (the) [Malvinas]',
      },
      FO: {
        id: 'option.addressCountries.FO',
        defaultMessage: 'Faroe Islands (the)',
      },
      FJ: {
        id: 'option.addressCountries.FJ',
        defaultMessage: 'Fiji',
      },
      FI: {
        id: 'option.addressCountries.FI',
        defaultMessage: 'Finland',
      },
      FR: {
        id: 'option.addressCountries.FR',
        defaultMessage: 'France',
      },
      GF: {
        id: 'option.addressCountries.GF',
        defaultMessage: 'French Guiana',
      },
      PF: {
        id: 'option.addressCountries.PF',
        defaultMessage: 'French Polynesia',
      },
      TF: {
        id: 'option.addressCountries.TF',
        defaultMessage: 'French Southern Territories (the)',
      },
      GA: {
        id: 'option.addressCountries.GA',
        defaultMessage: 'Gabon',
      },
      GM: {
        id: 'option.addressCountries.GM',
        defaultMessage: 'Gambia (the)',
      },
      GE: {
        id: 'option.addressCountries.GE',
        defaultMessage: 'Georgia',
      },
      DE: {
        id: 'option.addressCountries.DE',
        defaultMessage: 'Germany',
      },
      GH: {
        id: 'option.addressCountries.GH',
        defaultMessage: 'Ghana',
      },
      GI: {
        id: 'option.addressCountries.GI',
        defaultMessage: 'Gibraltar',
      },
      GR: {
        id: 'option.addressCountries.GR',
        defaultMessage: 'Greece',
      },
      GL: {
        id: 'option.addressCountries.GL',
        defaultMessage: 'Greenland',
      },
      GD: {
        id: 'option.addressCountries.GD',
        defaultMessage: 'Grenada',
      },
      GP: {
        id: 'option.addressCountries.GP',
        defaultMessage: 'Guadeloupe',
      },
      GU: {
        id: 'option.addressCountries.GU',
        defaultMessage: 'Guam',
      },
      GT: {
        id: 'option.addressCountries.GT',
        defaultMessage: 'Guatemala',
      },
      GG: {
        id: 'option.addressCountries.GG',
        defaultMessage: 'Guernsey',
      },
      GN: {
        id: 'option.addressCountries.GN',
        defaultMessage: 'Guinea',
      },
      GW: {
        id: 'option.addressCountries.GW',
        defaultMessage: 'Guinea-Bissau',
      },
      GY: {
        id: 'option.addressCountries.GY',
        defaultMessage: 'Guyana',
      },
      HT: {
        id: 'option.addressCountries.HT',
        defaultMessage: 'Haiti',
      },
      HM: {
        id: 'option.addressCountries.HM',
        defaultMessage: 'Heard Island and McDonald Islands',
      },
      VA: {
        id: 'option.addressCountries.VA',
        defaultMessage: 'Holy See (the)',
      },
      HN: {
        id: 'option.addressCountries.HN',
        defaultMessage: 'Honduras',
      },
      HK: {
        id: 'option.addressCountries.HK',
        defaultMessage: 'Hong Kong',
      },
      HU: {
        id: 'option.addressCountries.HU',
        defaultMessage: 'Hungary',
      },
      IS: {
        id: 'option.addressCountries.IS',
        defaultMessage: 'Iceland',
      },
      IN: {
        id: 'option.addressCountries.IN',
        defaultMessage: 'India',
      },
      ID: {
        id: 'option.addressCountries.ID',
        defaultMessage: 'Indonesia',
      },
      IR: {
        id: 'option.addressCountries.IR',
        defaultMessage: 'Iran (Islamic Republic of)',
      },
      IQ: {
        id: 'option.addressCountries.IQ',
        defaultMessage: 'Iraq',
      },
      IE: {
        id: 'option.addressCountries.IE',
        defaultMessage: 'Ireland',
      },
      IM: {
        id: 'option.addressCountries.IM',
        defaultMessage: 'Isle of Man',
      },
      IL: {
        id: 'option.addressCountries.IL',
        defaultMessage: 'Israel',
      },
      IT: {
        id: 'option.addressCountries.IT',
        defaultMessage: 'Italy',
      },
      JM: {
        id: 'option.addressCountries.JM',
        defaultMessage: 'Jamaica',
      },
      JP: {
        id: 'option.addressCountries.JP',
        defaultMessage: 'Japan',
      },
      JE: {
        id: 'option.addressCountries.JE',
        defaultMessage: 'Jersey',
      },
      JO: {
        id: 'option.addressCountries.JO',
        defaultMessage: 'Jordan',
      },
      KZ: {
        id: 'option.addressCountries.KZ',
        defaultMessage: 'Kazakhstan',
      },
      KE: {
        id: 'option.addressCountries.KE',
        defaultMessage: 'Kenya',
      },
      KI: {
        id: 'option.addressCountries.KI',
        defaultMessage: 'Kiribati',
      },
      KP: {
        id: 'option.addressCountries.KP',
        defaultMessage: 'Korea (the Democratic People\'s Republic of)',
      },
      KR: {
        id: 'option.addressCountries.KR',
        defaultMessage: 'Korea (the Republic of)',
      },
      KW: {
        id: 'option.addressCountries.KW',
        defaultMessage: 'Kuwait',
      },
      KG: {
        id: 'option.addressCountries.KG',
        defaultMessage: 'Kyrgyzstan',
      },
      LA: {
        id: 'option.addressCountries.LA',
        defaultMessage: 'Lao People\'s Democratic Republic (the)',
      },
      LV: {
        id: 'option.addressCountries.LV',
        defaultMessage: 'Latvia',
      },
      LB: {
        id: 'option.addressCountries.LB',
        defaultMessage: 'Lebanon',
      },
      LS: {
        id: 'option.addressCountries.LS',
        defaultMessage: 'Lesotho',
      },
      LR: {
        id: 'option.addressCountries.LR',
        defaultMessage: 'Liberia',
      },
      LY: {
        id: 'option.addressCountries.LY',
        defaultMessage: 'Libya',
      },
      LI: {
        id: 'option.addressCountries.LI',
        defaultMessage: 'Liechtenstein',
      },
      LT: {
        id: 'option.addressCountries.LT',
        defaultMessage: 'Lithuania',
      },
      LU: {
        id: 'option.addressCountries.LU',
        defaultMessage: 'Luxembourg',
      },
      MO: {
        id: 'option.addressCountries.MO',
        defaultMessage: 'Macao',
      },
      MK: {
        id: 'option.addressCountries.MK',
        defaultMessage: 'Macedonia (the former Yugoslav Republic of)',
      },
      MG: {
        id: 'option.addressCountries.MG',
        defaultMessage: 'Madagascar',
      },
      MW: {
        id: 'option.addressCountries.MW',
        defaultMessage: 'Malawi',
      },
      MY: {
        id: 'option.addressCountries.MY',
        defaultMessage: 'Malaysia',
      },
      MV: {
        id: 'option.addressCountries.MV',
        defaultMessage: 'Maldives',
      },
      ML: {
        id: 'option.addressCountries.ML',
        defaultMessage: 'Mali',
      },
      MT: {
        id: 'option.addressCountries.MT',
        defaultMessage: 'Malta',
      },
      MH: {
        id: 'option.addressCountries.MH',
        defaultMessage: 'Marshall Islands (the)',
      },
      MQ: {
        id: 'option.addressCountries.MQ',
        defaultMessage: 'Martinique',
      },
      MR: {
        id: 'option.addressCountries.MR',
        defaultMessage: 'Mauritania',
      },
      MU: {
        id: 'option.addressCountries.MU',
        defaultMessage: 'Mauritius',
      },
      YT: {
        id: 'option.addressCountries.YT',
        defaultMessage: 'Mayotte',
      },
      MX: {
        id: 'option.addressCountries.MX',
        defaultMessage: 'Mexico',
      },
      FM: {
        id: 'option.addressCountries.FM',
        defaultMessage: 'Micronesia (Federated States of)',
      },
      MD: {
        id: 'option.addressCountries.MD',
        defaultMessage: 'Moldova (the Republic of)',
      },
      MC: {
        id: 'option.addressCountries.MC',
        defaultMessage: 'Monaco',
      },
      MN: {
        id: 'option.addressCountries.MN',
        defaultMessage: 'Mongolia',
      },
      ME: {
        id: 'option.addressCountries.ME',
        defaultMessage: 'Montenegro',
      },
      MS: {
        id: 'option.addressCountries.MS',
        defaultMessage: 'Montserrat',
      },
      MA: {
        id: 'option.addressCountries.MA',
        defaultMessage: 'Morocco',
      },
      MZ: {
        id: 'option.addressCountries.MZ',
        defaultMessage: 'Mozambique',
      },
      MM: {
        id: 'option.addressCountries.MM',
        defaultMessage: 'Myanmar',
      },
      NA: {
        id: 'option.addressCountries.NA',
        defaultMessage: 'Namibia',
      },
      NR: {
        id: 'option.addressCountries.NR',
        defaultMessage: 'Nauru',
      },
      NP: {
        id: 'option.addressCountries.NP',
        defaultMessage: 'Nepal',
      },
      NL: {
        id: 'option.addressCountries.NL',
        defaultMessage: 'Netherlands (the)',
      },
      NC: {
        id: 'option.addressCountries.NC',
        defaultMessage: 'New Caledonia',
      },
      NZ: {
        id: 'option.addressCountries.NZ',
        defaultMessage: 'New Zealand',
      },
      NI: {
        id: 'option.addressCountries.NI',
        defaultMessage: 'Nicaragua',
      },
      NE: {
        id: 'option.addressCountries.NE',
        defaultMessage: 'Niger (the)',
      },
      NG: {
        id: 'option.addressCountries.NG',
        defaultMessage: 'Nigeria',
      },
      NU: {
        id: 'option.addressCountries.NU',
        defaultMessage: 'Niue',
      },
      NF: {
        id: 'option.addressCountries.NF',
        defaultMessage: 'Norfolk Island',
      },
      MP: {
        id: 'option.addressCountries.MP',
        defaultMessage: 'Northern Mariana Islands (the)',
      },
      NO: {
        id: 'option.addressCountries.NO',
        defaultMessage: 'Norway',
      },
      OM: {
        id: 'option.addressCountries.OM',
        defaultMessage: 'Oman',
      },
      PK: {
        id: 'option.addressCountries.PK',
        defaultMessage: 'Pakistan',
      },
      PW: {
        id: 'option.addressCountries.PW',
        defaultMessage: 'Palau',
      },
      PS: {
        id: 'option.addressCountries.PS',
        defaultMessage: 'Palestine, State of',
      },
      PA: {
        id: 'option.addressCountries.PA',
        defaultMessage: 'Panama',
      },
      PG: {
        id: 'option.addressCountries.PG',
        defaultMessage: 'Papua New Guinea',
      },
      PY: {
        id: 'option.addressCountries.PY',
        defaultMessage: 'Paraguay',
      },
      PE: {
        id: 'option.addressCountries.PE',
        defaultMessage: 'Peru',
      },
      PH: {
        id: 'option.addressCountries.PH',
        defaultMessage: 'Philippines (the)',
      },
      PN: {
        id: 'option.addressCountries.PN',
        defaultMessage: 'Pitcairn',
      },
      PL: {
        id: 'option.addressCountries.PL',
        defaultMessage: 'Poland',
      },
      PT: {
        id: 'option.addressCountries.PT',
        defaultMessage: 'Portugal',
      },
      PR: {
        id: 'option.addressCountries.PR',
        defaultMessage: 'Puerto Rico',
      },
      QA: {
        id: 'option.addressCountries.QA',
        defaultMessage: 'Qatar',
      },
      RE: {
        id: 'option.addressCountries.RE',
        defaultMessage: 'Réunion',
      },
      RO: {
        id: 'option.addressCountries.RO',
        defaultMessage: 'Romania',
      },
      RU: {
        id: 'option.addressCountries.RU',
        defaultMessage: 'Russian Federation (the)',
      },
      RW: {
        id: 'option.addressCountries.RW',
        defaultMessage: 'Rwanda',
      },
      BL: {
        id: 'option.addressCountries.BL',
        defaultMessage: 'Saint Barthélemy',
      },
      SH: {
        id: 'option.addressCountries.SH',
        defaultMessage: 'Saint Helena, Ascension and Tristan da Cunha',
      },
      KN: {
        id: 'option.addressCountries.KN',
        defaultMessage: 'Saint Kitts and Nevis',
      },
      LC: {
        id: 'option.addressCountries.LC',
        defaultMessage: 'Saint Lucia',
      },
      MF: {
        id: 'option.addressCountries.MF',
        defaultMessage: 'Saint Martin (French part)',
      },
      PM: {
        id: 'option.addressCountries.PM',
        defaultMessage: 'Saint Pierre and Miquelon',
      },
      VC: {
        id: 'option.addressCountries.VC',
        defaultMessage: 'Saint Vincent and the Grenadines',
      },
      WS: {
        id: 'option.addressCountries.WS',
        defaultMessage: 'Samoa',
      },
      SM: {
        id: 'option.addressCountries.SM',
        defaultMessage: 'San Marino',
      },
      ST: {
        id: 'option.addressCountries.ST',
        defaultMessage: 'Sao Tome and Principe',
      },
      SA: {
        id: 'option.addressCountries.SA',
        defaultMessage: 'Saudi Arabia',
      },
      SN: {
        id: 'option.addressCountries.SN',
        defaultMessage: 'Senegal',
      },
      RS: {
        id: 'option.addressCountries.RS',
        defaultMessage: 'Serbia',
      },
      SC: {
        id: 'option.addressCountries.SC',
        defaultMessage: 'Seychelles',
      },
      SL: {
        id: 'option.addressCountries.SL',
        defaultMessage: 'Sierra Leone',
      },
      SG: {
        id: 'option.addressCountries.SG',
        defaultMessage: 'Singapore',
      },
      SX: {
        id: 'option.addressCountries.SX',
        defaultMessage: 'Sint Maarten (Dutch part)',
      },
      SK: {
        id: 'option.addressCountries.SK',
        defaultMessage: 'Slovakia',
      },
      SI: {
        id: 'option.addressCountries.SI',
        defaultMessage: 'Slovenia',
      },
      SB: {
        id: 'option.addressCountries.SB',
        defaultMessage: 'Solomon Islands',
      },
      SO: {
        id: 'option.addressCountries.SO',
        defaultMessage: 'Somalia',
      },
      ZA: {
        id: 'option.addressCountries.ZA',
        defaultMessage: 'South Africa',
      },
      GS: {
        id: 'option.addressCountries.GS',
        defaultMessage: 'South Georgia and the South Sandwich Islands',
      },
      SS: {
        id: 'option.addressCountries.SS',
        defaultMessage: 'South Sudan',
      },
      ES: {
        id: 'option.addressCountries.ES',
        defaultMessage: 'Spain',
      },
      LK: {
        id: 'option.addressCountries.LK',
        defaultMessage: 'Sri Lanka',
      },
      SD: {
        id: 'option.addressCountries.SD',
        defaultMessage: 'Sudan (the)',
      },
      SR: {
        id: 'option.addressCountries.SR',
        defaultMessage: 'Suriname',
      },
      SJ: {
        id: 'option.addressCountries.SJ',
        defaultMessage: 'Svalbard and Jan Mayen',
      },
      SZ: {
        id: 'option.addressCountries.SZ',
        defaultMessage: 'Swaziland',
      },
      SE: {
        id: 'option.addressCountries.SE',
        defaultMessage: 'Sweden',
      },
      CH: {
        id: 'option.addressCountries.CH',
        defaultMessage: 'Switzerland',
      },
      SY: {
        id: 'option.addressCountries.SY',
        defaultMessage: 'Syrian Arab Republic',
      },
      TW: {
        id: 'option.addressCountries.TW',
        defaultMessage: 'Taiwan (Province of China)',
      },
      TJ: {
        id: 'option.addressCountries.TJ',
        defaultMessage: 'Tajikistan',
      },
      TZ: {
        id: 'option.addressCountries.TZ',
        defaultMessage: 'Tanzania, United Republic of',
      },
      TH: {
        id: 'option.addressCountries.TH',
        defaultMessage: 'Thailand',
      },
      TL: {
        id: 'option.addressCountries.TL',
        defaultMessage: 'Timor-Leste',
      },
      TG: {
        id: 'option.addressCountries.TG',
        defaultMessage: 'Togo',
      },
      TK: {
        id: 'option.addressCountries.TK',
        defaultMessage: 'Tokelau',
      },
      TO: {
        id: 'option.addressCountries.TO',
        defaultMessage: 'Tonga',
      },
      TT: {
        id: 'option.addressCountries.TT',
        defaultMessage: 'Trinidad and Tobago',
      },
      TN: {
        id: 'option.addressCountries.TN',
        defaultMessage: 'Tunisia',
      },
      TR: {
        id: 'option.addressCountries.TR',
        defaultMessage: 'Turkey',
      },
      TM: {
        id: 'option.addressCountries.TM',
        defaultMessage: 'Turkmenistan',
      },
      TC: {
        id: 'option.addressCountries.TC',
        defaultMessage: 'Turks and Caicos Islands (the)',
      },
      TV: {
        id: 'option.addressCountries.TV',
        defaultMessage: 'Tuvalu',
      },
      UG: {
        id: 'option.addressCountries.UG',
        defaultMessage: 'Uganda',
      },
      UA: {
        id: 'option.addressCountries.UA',
        defaultMessage: 'Ukraine',
      },
      AE: {
        id: 'option.addressCountries.AE',
        defaultMessage: 'United Arab Emirates (the)',
      },
      GB: {
        id: 'option.addressCountries.GB',
        defaultMessage: 'United Kingdom of Great Britain and Northern Ireland (the)',
      },
      US: {
        id: 'option.addressCountries.US',
        defaultMessage: 'United States of America (the)',
      },
      UM: {
        id: 'option.addressCountries.UM',
        defaultMessage: 'United States Minor Outlying Islands (the)',
      },
      UY: {
        id: 'option.addressCountries.UY',
        defaultMessage: 'Uruguay',
      },
      UZ: {
        id: 'option.addressCountries.UZ',
        defaultMessage: 'Uzbekistan',
      },
      VU: {
        id: 'option.addressCountries.VU',
        defaultMessage: 'Vanuatu',
      },
      VE: {
        id: 'option.addressCountries.VE',
        defaultMessage: 'Venezuela (Bolivarian Republic of)',
      },
      VN: {
        id: 'option.addressCountries.VN',
        defaultMessage: 'Viet Nam',
      },
      VG: {
        id: 'option.addressCountries.VG',
        defaultMessage: 'Virgin Islands (British)',
      },
      VI: {
        id: 'option.addressCountries.VI',
        defaultMessage: 'Virgin Islands (U.S.)',
      },
      WF: {
        id: 'option.addressCountries.WF',
        defaultMessage: 'Wallis and Futuna',
      },
      EH: {
        id: 'option.addressCountries.EH',
        defaultMessage: 'Western Sahara',
      },
      YE: {
        id: 'option.addressCountries.YE',
        defaultMessage: 'Yemen',
      },
      ZM: {
        id: 'option.addressCountries.ZM',
        defaultMessage: 'Zambia',
      },
      ZW: {
        id: 'option.addressCountries.ZW',
        defaultMessage: 'Zimbabwe',
      },
    }),
  },
};
