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
        id: 'option.addressCountry.AF',
        defaultMessage: 'Afghanistan',
      },
      AX: {
        id: 'option.addressCountry.AX',
        defaultMessage: 'Åland Islands',
      },
      AL: {
        id: 'option.addressCountry.AL',
        defaultMessage: 'Albania',
      },
      DZ: {
        id: 'option.addressCountry.DZ',
        defaultMessage: 'Algeria',
      },
      AS: {
        id: 'option.addressCountry.AS',
        defaultMessage: 'American Samoa',
      },
      AD: {
        id: 'option.addressCountry.AD',
        defaultMessage: 'Andorra',
      },
      AO: {
        id: 'option.addressCountry.AO',
        defaultMessage: 'Angola',
      },
      AI: {
        id: 'option.addressCountry.AI',
        defaultMessage: 'Anguilla',
      },
      AQ: {
        id: 'option.addressCountry.AQ',
        defaultMessage: 'Antarctica',
      },
      AG: {
        id: 'option.addressCountry.AG',
        defaultMessage: 'Antigua and Barbuda',
      },
      AR: {
        id: 'option.addressCountry.AR',
        defaultMessage: 'Argentina',
      },
      AM: {
        id: 'option.addressCountry.AM',
        defaultMessage: 'Armenia',
      },
      AW: {
        id: 'option.addressCountry.AW',
        defaultMessage: 'Aruba',
      },
      AU: {
        id: 'option.addressCountry.AU',
        defaultMessage: 'Australia',
      },
      AT: {
        id: 'option.addressCountry.AT',
        defaultMessage: 'Austria',
      },
      AZ: {
        id: 'option.addressCountry.AZ',
        defaultMessage: 'Azerbaijan',
      },
      BS: {
        id: 'option.addressCountry.BS',
        defaultMessage: 'Bahamas (the)',
      },
      BH: {
        id: 'option.addressCountry.BH',
        defaultMessage: 'Bahrain',
      },
      BD: {
        id: 'option.addressCountry.BD',
        defaultMessage: 'Bangladesh',
      },
      BB: {
        id: 'option.addressCountry.BB',
        defaultMessage: 'Barbados',
      },
      BY: {
        id: 'option.addressCountry.BY',
        defaultMessage: 'Belarus',
      },
      BE: {
        id: 'option.addressCountry.BE',
        defaultMessage: 'Belgium',
      },
      BZ: {
        id: 'option.addressCountry.BZ',
        defaultMessage: 'Belize',
      },
      BJ: {
        id: 'option.addressCountry.BJ',
        defaultMessage: 'Benin',
      },
      BM: {
        id: 'option.addressCountry.BM',
        defaultMessage: 'Bermuda',
      },
      BT: {
        id: 'option.addressCountry.BT',
        defaultMessage: 'Bhutan',
      },
      BO: {
        id: 'option.addressCountry.BO',
        defaultMessage: 'Bolivia (Plurinational State of)',
      },
      BQ: {
        id: 'option.addressCountry.BQ',
        defaultMessage: 'Bonaire, Sint Eustatius and Saba',
      },
      BA: {
        id: 'option.addressCountry.BA',
        defaultMessage: 'Bosnia and Herzegovina',
      },
      BW: {
        id: 'option.addressCountry.BW',
        defaultMessage: 'Botswana',
      },
      BV: {
        id: 'option.addressCountry.BV',
        defaultMessage: 'Bouvet Island',
      },
      BR: {
        id: 'option.addressCountry.BR',
        defaultMessage: 'Brazil',
      },
      IO: {
        id: 'option.addressCountry.IO',
        defaultMessage: 'British Indian Ocean Territory (the)',
      },
      BN: {
        id: 'option.addressCountry.BN',
        defaultMessage: 'Brunei Darussalam',
      },
      BG: {
        id: 'option.addressCountry.BG',
        defaultMessage: 'Bulgaria',
      },
      BF: {
        id: 'option.addressCountry.BF',
        defaultMessage: 'Burkina Faso',
      },
      BI: {
        id: 'option.addressCountry.BI',
        defaultMessage: 'Burundi',
      },
      KH: {
        id: 'option.addressCountry.KH',
        defaultMessage: 'Cambodia',
      },
      CM: {
        id: 'option.addressCountry.CM',
        defaultMessage: 'Cameroon',
      },
      CA: {
        id: 'option.addressCountry.CA',
        defaultMessage: 'Canada',
      },
      CV: {
        id: 'option.addressCountry.CV',
        defaultMessage: 'Cape Verde',
      },
      KY: {
        id: 'option.addressCountry.KY',
        defaultMessage: 'Cayman Islands (the)',
      },
      CF: {
        id: 'option.addressCountry.CF',
        defaultMessage: 'Central African Republic (the)',
      },
      TD: {
        id: 'option.addressCountry.TD',
        defaultMessage: 'Chad',
      },
      CL: {
        id: 'option.addressCountry.CL',
        defaultMessage: 'Chile',
      },
      CN: {
        id: 'option.addressCountry.CN',
        defaultMessage: 'China',
      },
      CX: {
        id: 'option.addressCountry.CX',
        defaultMessage: 'Christmas Island',
      },
      CC: {
        id: 'option.addressCountry.CC',
        defaultMessage: 'Cocos (Keeling) Islands (the)',
      },
      CO: {
        id: 'option.addressCountry.CO',
        defaultMessage: 'Colombia',
      },
      KM: {
        id: 'option.addressCountry.KM',
        defaultMessage: 'Comoros (the)',
      },
      CG: {
        id: 'option.addressCountry.CG',
        defaultMessage: 'Congo (the)',
      },
      CD: {
        id: 'option.addressCountry.CD',
        defaultMessage: 'Congo (the Democratic Republic of the)',
      },
      CK: {
        id: 'option.addressCountry.CK',
        defaultMessage: 'Cook Islands (the)',
      },
      CR: {
        id: 'option.addressCountry.CR',
        defaultMessage: 'Costa Rica',
      },
      CI: {
        id: 'option.addressCountry.CI',
        defaultMessage: 'Côte d\'Ivoire',
      },
      HR: {
        id: 'option.addressCountry.HR',
        defaultMessage: 'Croatia',
      },
      CU: {
        id: 'option.addressCountry.CU',
        defaultMessage: 'Cuba',
      },
      CW: {
        id: 'option.addressCountry.CW',
        defaultMessage: 'Curaçao',
      },
      CY: {
        id: 'option.addressCountry.CY',
        defaultMessage: 'Cyprus',
      },
      CZ: {
        id: 'option.addressCountry.CZ',
        defaultMessage: 'Czechia',
      },
      DK: {
        id: 'option.addressCountry.DK',
        defaultMessage: 'Denmark',
      },
      DJ: {
        id: 'option.addressCountry.DJ',
        defaultMessage: 'Djibouti',
      },
      DM: {
        id: 'option.addressCountry.DM',
        defaultMessage: 'Dominica',
      },
      DO: {
        id: 'option.addressCountry.DO',
        defaultMessage: 'Dominican Republic (the)',
      },
      EC: {
        id: 'option.addressCountry.EC',
        defaultMessage: 'Ecuador',
      },
      EG: {
        id: 'option.addressCountry.EG',
        defaultMessage: 'Egypt',
      },
      SV: {
        id: 'option.addressCountry.SV',
        defaultMessage: 'El Salvador',
      },
      GQ: {
        id: 'option.addressCountry.GQ',
        defaultMessage: 'Equatorial Guinea',
      },
      ER: {
        id: 'option.addressCountry.ER',
        defaultMessage: 'Eritrea',
      },
      EE: {
        id: 'option.addressCountry.EE',
        defaultMessage: 'Estonia',
      },
      ET: {
        id: 'option.addressCountry.ET',
        defaultMessage: 'Ethiopia',
      },
      FK: {
        id: 'option.addressCountry.FK',
        defaultMessage: 'Falkland Islands (the) [Malvinas]',
      },
      FO: {
        id: 'option.addressCountry.FO',
        defaultMessage: 'Faroe Islands (the)',
      },
      FJ: {
        id: 'option.addressCountry.FJ',
        defaultMessage: 'Fiji',
      },
      FI: {
        id: 'option.addressCountry.FI',
        defaultMessage: 'Finland',
      },
      FR: {
        id: 'option.addressCountry.FR',
        defaultMessage: 'France',
      },
      GF: {
        id: 'option.addressCountry.GF',
        defaultMessage: 'French Guiana',
      },
      PF: {
        id: 'option.addressCountry.PF',
        defaultMessage: 'French Polynesia',
      },
      TF: {
        id: 'option.addressCountry.TF',
        defaultMessage: 'French Southern Territories (the)',
      },
      GA: {
        id: 'option.addressCountry.GA',
        defaultMessage: 'Gabon',
      },
      GM: {
        id: 'option.addressCountry.GM',
        defaultMessage: 'Gambia (the)',
      },
      GE: {
        id: 'option.addressCountry.GE',
        defaultMessage: 'Georgia',
      },
      DE: {
        id: 'option.addressCountry.DE',
        defaultMessage: 'Germany',
      },
      GH: {
        id: 'option.addressCountry.GH',
        defaultMessage: 'Ghana',
      },
      GI: {
        id: 'option.addressCountry.GI',
        defaultMessage: 'Gibraltar',
      },
      GR: {
        id: 'option.addressCountry.GR',
        defaultMessage: 'Greece',
      },
      GL: {
        id: 'option.addressCountry.GL',
        defaultMessage: 'Greenland',
      },
      GD: {
        id: 'option.addressCountry.GD',
        defaultMessage: 'Grenada',
      },
      GP: {
        id: 'option.addressCountry.GP',
        defaultMessage: 'Guadeloupe',
      },
      GU: {
        id: 'option.addressCountry.GU',
        defaultMessage: 'Guam',
      },
      GT: {
        id: 'option.addressCountry.GT',
        defaultMessage: 'Guatemala',
      },
      GG: {
        id: 'option.addressCountry.GG',
        defaultMessage: 'Guernsey',
      },
      GN: {
        id: 'option.addressCountry.GN',
        defaultMessage: 'Guinea',
      },
      GW: {
        id: 'option.addressCountry.GW',
        defaultMessage: 'Guinea-Bissau',
      },
      GY: {
        id: 'option.addressCountry.GY',
        defaultMessage: 'Guyana',
      },
      HT: {
        id: 'option.addressCountry.HT',
        defaultMessage: 'Haiti',
      },
      HM: {
        id: 'option.addressCountry.HM',
        defaultMessage: 'Heard Island and McDonald Islands',
      },
      VA: {
        id: 'option.addressCountry.VA',
        defaultMessage: 'Holy See (the)',
      },
      HN: {
        id: 'option.addressCountry.HN',
        defaultMessage: 'Honduras',
      },
      HK: {
        id: 'option.addressCountry.HK',
        defaultMessage: 'Hong Kong',
      },
      HU: {
        id: 'option.addressCountry.HU',
        defaultMessage: 'Hungary',
      },
      IS: {
        id: 'option.addressCountry.IS',
        defaultMessage: 'Iceland',
      },
      IN: {
        id: 'option.addressCountry.IN',
        defaultMessage: 'India',
      },
      ID: {
        id: 'option.addressCountry.ID',
        defaultMessage: 'Indonesia',
      },
      IR: {
        id: 'option.addressCountry.IR',
        defaultMessage: 'Iran (Islamic Republic of)',
      },
      IQ: {
        id: 'option.addressCountry.IQ',
        defaultMessage: 'Iraq',
      },
      IE: {
        id: 'option.addressCountry.IE',
        defaultMessage: 'Ireland',
      },
      IM: {
        id: 'option.addressCountry.IM',
        defaultMessage: 'Isle of Man',
      },
      IL: {
        id: 'option.addressCountry.IL',
        defaultMessage: 'Israel',
      },
      IT: {
        id: 'option.addressCountry.IT',
        defaultMessage: 'Italy',
      },
      JM: {
        id: 'option.addressCountry.JM',
        defaultMessage: 'Jamaica',
      },
      JP: {
        id: 'option.addressCountry.JP',
        defaultMessage: 'Japan',
      },
      JE: {
        id: 'option.addressCountry.JE',
        defaultMessage: 'Jersey',
      },
      JO: {
        id: 'option.addressCountry.JO',
        defaultMessage: 'Jordan',
      },
      KZ: {
        id: 'option.addressCountry.KZ',
        defaultMessage: 'Kazakhstan',
      },
      KE: {
        id: 'option.addressCountry.KE',
        defaultMessage: 'Kenya',
      },
      KI: {
        id: 'option.addressCountry.KI',
        defaultMessage: 'Kiribati',
      },
      KP: {
        id: 'option.addressCountry.KP',
        defaultMessage: 'Korea (the Democratic People\'s Republic of)',
      },
      KR: {
        id: 'option.addressCountry.KR',
        defaultMessage: 'Korea (the Republic of)',
      },
      KW: {
        id: 'option.addressCountry.KW',
        defaultMessage: 'Kuwait',
      },
      KG: {
        id: 'option.addressCountry.KG',
        defaultMessage: 'Kyrgyzstan',
      },
      LA: {
        id: 'option.addressCountry.LA',
        defaultMessage: 'Lao People\'s Democratic Republic (the)',
      },
      LV: {
        id: 'option.addressCountry.LV',
        defaultMessage: 'Latvia',
      },
      LB: {
        id: 'option.addressCountry.LB',
        defaultMessage: 'Lebanon',
      },
      LS: {
        id: 'option.addressCountry.LS',
        defaultMessage: 'Lesotho',
      },
      LR: {
        id: 'option.addressCountry.LR',
        defaultMessage: 'Liberia',
      },
      LY: {
        id: 'option.addressCountry.LY',
        defaultMessage: 'Libya',
      },
      LI: {
        id: 'option.addressCountry.LI',
        defaultMessage: 'Liechtenstein',
      },
      LT: {
        id: 'option.addressCountry.LT',
        defaultMessage: 'Lithuania',
      },
      LU: {
        id: 'option.addressCountry.LU',
        defaultMessage: 'Luxembourg',
      },
      MO: {
        id: 'option.addressCountry.MO',
        defaultMessage: 'Macao',
      },
      MK: {
        id: 'option.addressCountry.MK',
        defaultMessage: 'Macedonia (the former Yugoslav Republic of)',
      },
      MG: {
        id: 'option.addressCountry.MG',
        defaultMessage: 'Madagascar',
      },
      MW: {
        id: 'option.addressCountry.MW',
        defaultMessage: 'Malawi',
      },
      MY: {
        id: 'option.addressCountry.MY',
        defaultMessage: 'Malaysia',
      },
      MV: {
        id: 'option.addressCountry.MV',
        defaultMessage: 'Maldives',
      },
      ML: {
        id: 'option.addressCountry.ML',
        defaultMessage: 'Mali',
      },
      MT: {
        id: 'option.addressCountry.MT',
        defaultMessage: 'Malta',
      },
      MH: {
        id: 'option.addressCountry.MH',
        defaultMessage: 'Marshall Islands (the)',
      },
      MQ: {
        id: 'option.addressCountry.MQ',
        defaultMessage: 'Martinique',
      },
      MR: {
        id: 'option.addressCountry.MR',
        defaultMessage: 'Mauritania',
      },
      MU: {
        id: 'option.addressCountry.MU',
        defaultMessage: 'Mauritius',
      },
      YT: {
        id: 'option.addressCountry.YT',
        defaultMessage: 'Mayotte',
      },
      MX: {
        id: 'option.addressCountry.MX',
        defaultMessage: 'Mexico',
      },
      FM: {
        id: 'option.addressCountry.FM',
        defaultMessage: 'Micronesia (Federated States of)',
      },
      MD: {
        id: 'option.addressCountry.MD',
        defaultMessage: 'Moldova (the Republic of)',
      },
      MC: {
        id: 'option.addressCountry.MC',
        defaultMessage: 'Monaco',
      },
      MN: {
        id: 'option.addressCountry.MN',
        defaultMessage: 'Mongolia',
      },
      ME: {
        id: 'option.addressCountry.ME',
        defaultMessage: 'Montenegro',
      },
      MS: {
        id: 'option.addressCountry.MS',
        defaultMessage: 'Montserrat',
      },
      MA: {
        id: 'option.addressCountry.MA',
        defaultMessage: 'Morocco',
      },
      MZ: {
        id: 'option.addressCountry.MZ',
        defaultMessage: 'Mozambique',
      },
      MM: {
        id: 'option.addressCountry.MM',
        defaultMessage: 'Myanmar',
      },
      NA: {
        id: 'option.addressCountry.NA',
        defaultMessage: 'Namibia',
      },
      NR: {
        id: 'option.addressCountry.NR',
        defaultMessage: 'Nauru',
      },
      NP: {
        id: 'option.addressCountry.NP',
        defaultMessage: 'Nepal',
      },
      NL: {
        id: 'option.addressCountry.NL',
        defaultMessage: 'Netherlands (the)',
      },
      NC: {
        id: 'option.addressCountry.NC',
        defaultMessage: 'New Caledonia',
      },
      NZ: {
        id: 'option.addressCountry.NZ',
        defaultMessage: 'New Zealand',
      },
      NI: {
        id: 'option.addressCountry.NI',
        defaultMessage: 'Nicaragua',
      },
      NE: {
        id: 'option.addressCountry.NE',
        defaultMessage: 'Niger (the)',
      },
      NG: {
        id: 'option.addressCountry.NG',
        defaultMessage: 'Nigeria',
      },
      NU: {
        id: 'option.addressCountry.NU',
        defaultMessage: 'Niue',
      },
      NF: {
        id: 'option.addressCountry.NF',
        defaultMessage: 'Norfolk Island',
      },
      MP: {
        id: 'option.addressCountry.MP',
        defaultMessage: 'Northern Mariana Islands (the)',
      },
      NO: {
        id: 'option.addressCountry.NO',
        defaultMessage: 'Norway',
      },
      OM: {
        id: 'option.addressCountry.OM',
        defaultMessage: 'Oman',
      },
      PK: {
        id: 'option.addressCountry.PK',
        defaultMessage: 'Pakistan',
      },
      PW: {
        id: 'option.addressCountry.PW',
        defaultMessage: 'Palau',
      },
      PS: {
        id: 'option.addressCountry.PS',
        defaultMessage: 'Palestine, State of',
      },
      PA: {
        id: 'option.addressCountry.PA',
        defaultMessage: 'Panama',
      },
      PG: {
        id: 'option.addressCountry.PG',
        defaultMessage: 'Papua New Guinea',
      },
      PY: {
        id: 'option.addressCountry.PY',
        defaultMessage: 'Paraguay',
      },
      PE: {
        id: 'option.addressCountry.PE',
        defaultMessage: 'Peru',
      },
      PH: {
        id: 'option.addressCountry.PH',
        defaultMessage: 'Philippines (the)',
      },
      PN: {
        id: 'option.addressCountry.PN',
        defaultMessage: 'Pitcairn',
      },
      PL: {
        id: 'option.addressCountry.PL',
        defaultMessage: 'Poland',
      },
      PT: {
        id: 'option.addressCountry.PT',
        defaultMessage: 'Portugal',
      },
      PR: {
        id: 'option.addressCountry.PR',
        defaultMessage: 'Puerto Rico',
      },
      QA: {
        id: 'option.addressCountry.QA',
        defaultMessage: 'Qatar',
      },
      RE: {
        id: 'option.addressCountry.RE',
        defaultMessage: 'Réunion',
      },
      RO: {
        id: 'option.addressCountry.RO',
        defaultMessage: 'Romania',
      },
      RU: {
        id: 'option.addressCountry.RU',
        defaultMessage: 'Russian Federation (the)',
      },
      RW: {
        id: 'option.addressCountry.RW',
        defaultMessage: 'Rwanda',
      },
      BL: {
        id: 'option.addressCountry.BL',
        defaultMessage: 'Saint Barthélemy',
      },
      SH: {
        id: 'option.addressCountry.SH',
        defaultMessage: 'Saint Helena, Ascension and Tristan da Cunha',
      },
      KN: {
        id: 'option.addressCountry.KN',
        defaultMessage: 'Saint Kitts and Nevis',
      },
      LC: {
        id: 'option.addressCountry.LC',
        defaultMessage: 'Saint Lucia',
      },
      MF: {
        id: 'option.addressCountry.MF',
        defaultMessage: 'Saint Martin (French part)',
      },
      PM: {
        id: 'option.addressCountry.PM',
        defaultMessage: 'Saint Pierre and Miquelon',
      },
      VC: {
        id: 'option.addressCountry.VC',
        defaultMessage: 'Saint Vincent and the Grenadines',
      },
      WS: {
        id: 'option.addressCountry.WS',
        defaultMessage: 'Samoa',
      },
      SM: {
        id: 'option.addressCountry.SM',
        defaultMessage: 'San Marino',
      },
      ST: {
        id: 'option.addressCountry.ST',
        defaultMessage: 'Sao Tome and Principe',
      },
      SA: {
        id: 'option.addressCountry.SA',
        defaultMessage: 'Saudi Arabia',
      },
      SN: {
        id: 'option.addressCountry.SN',
        defaultMessage: 'Senegal',
      },
      RS: {
        id: 'option.addressCountry.RS',
        defaultMessage: 'Serbia',
      },
      SC: {
        id: 'option.addressCountry.SC',
        defaultMessage: 'Seychelles',
      },
      SL: {
        id: 'option.addressCountry.SL',
        defaultMessage: 'Sierra Leone',
      },
      SG: {
        id: 'option.addressCountry.SG',
        defaultMessage: 'Singapore',
      },
      SX: {
        id: 'option.addressCountry.SX',
        defaultMessage: 'Sint Maarten (Dutch part)',
      },
      SK: {
        id: 'option.addressCountry.SK',
        defaultMessage: 'Slovakia',
      },
      SI: {
        id: 'option.addressCountry.SI',
        defaultMessage: 'Slovenia',
      },
      SB: {
        id: 'option.addressCountry.SB',
        defaultMessage: 'Solomon Islands',
      },
      SO: {
        id: 'option.addressCountry.SO',
        defaultMessage: 'Somalia',
      },
      ZA: {
        id: 'option.addressCountry.ZA',
        defaultMessage: 'South Africa',
      },
      GS: {
        id: 'option.addressCountry.GS',
        defaultMessage: 'South Georgia and the South Sandwich Islands',
      },
      SS: {
        id: 'option.addressCountry.SS',
        defaultMessage: 'South Sudan',
      },
      ES: {
        id: 'option.addressCountry.ES',
        defaultMessage: 'Spain',
      },
      LK: {
        id: 'option.addressCountry.LK',
        defaultMessage: 'Sri Lanka',
      },
      SD: {
        id: 'option.addressCountry.SD',
        defaultMessage: 'Sudan (the)',
      },
      SR: {
        id: 'option.addressCountry.SR',
        defaultMessage: 'Suriname',
      },
      SJ: {
        id: 'option.addressCountry.SJ',
        defaultMessage: 'Svalbard and Jan Mayen',
      },
      SZ: {
        id: 'option.addressCountry.SZ',
        defaultMessage: 'Swaziland',
      },
      SE: {
        id: 'option.addressCountry.SE',
        defaultMessage: 'Sweden',
      },
      CH: {
        id: 'option.addressCountry.CH',
        defaultMessage: 'Switzerland',
      },
      SY: {
        id: 'option.addressCountry.SY',
        defaultMessage: 'Syrian Arab Republic',
      },
      TW: {
        id: 'option.addressCountry.TW',
        defaultMessage: 'Taiwan (Province of China)',
      },
      TJ: {
        id: 'option.addressCountry.TJ',
        defaultMessage: 'Tajikistan',
      },
      TZ: {
        id: 'option.addressCountry.TZ',
        defaultMessage: 'Tanzania, United Republic of',
      },
      TH: {
        id: 'option.addressCountry.TH',
        defaultMessage: 'Thailand',
      },
      TL: {
        id: 'option.addressCountry.TL',
        defaultMessage: 'Timor-Leste',
      },
      TG: {
        id: 'option.addressCountry.TG',
        defaultMessage: 'Togo',
      },
      TK: {
        id: 'option.addressCountry.TK',
        defaultMessage: 'Tokelau',
      },
      TO: {
        id: 'option.addressCountry.TO',
        defaultMessage: 'Tonga',
      },
      TT: {
        id: 'option.addressCountry.TT',
        defaultMessage: 'Trinidad and Tobago',
      },
      TN: {
        id: 'option.addressCountry.TN',
        defaultMessage: 'Tunisia',
      },
      TR: {
        id: 'option.addressCountry.TR',
        defaultMessage: 'Turkey',
      },
      TM: {
        id: 'option.addressCountry.TM',
        defaultMessage: 'Turkmenistan',
      },
      TC: {
        id: 'option.addressCountry.TC',
        defaultMessage: 'Turks and Caicos Islands (the)',
      },
      TV: {
        id: 'option.addressCountry.TV',
        defaultMessage: 'Tuvalu',
      },
      UG: {
        id: 'option.addressCountry.UG',
        defaultMessage: 'Uganda',
      },
      UA: {
        id: 'option.addressCountry.UA',
        defaultMessage: 'Ukraine',
      },
      AE: {
        id: 'option.addressCountry.AE',
        defaultMessage: 'United Arab Emirates (the)',
      },
      GB: {
        id: 'option.addressCountry.GB',
        defaultMessage: 'United Kingdom of Great Britain and Northern Ireland (the)',
      },
      US: {
        id: 'option.addressCountry.US',
        defaultMessage: 'United States of America (the)',
      },
      UM: {
        id: 'option.addressCountry.UM',
        defaultMessage: 'United States Minor Outlying Islands (the)',
      },
      UY: {
        id: 'option.addressCountry.UY',
        defaultMessage: 'Uruguay',
      },
      UZ: {
        id: 'option.addressCountry.UZ',
        defaultMessage: 'Uzbekistan',
      },
      VU: {
        id: 'option.addressCountry.VU',
        defaultMessage: 'Vanuatu',
      },
      VE: {
        id: 'option.addressCountry.VE',
        defaultMessage: 'Venezuela (Bolivarian Republic of)',
      },
      VN: {
        id: 'option.addressCountry.VN',
        defaultMessage: 'Viet Nam',
      },
      VG: {
        id: 'option.addressCountry.VG',
        defaultMessage: 'Virgin Islands (British)',
      },
      VI: {
        id: 'option.addressCountry.VI',
        defaultMessage: 'Virgin Islands (U.S.)',
      },
      WF: {
        id: 'option.addressCountry.WF',
        defaultMessage: 'Wallis and Futuna',
      },
      EH: {
        id: 'option.addressCountry.EH',
        defaultMessage: 'Western Sahara',
      },
      YE: {
        id: 'option.addressCountry.YE',
        defaultMessage: 'Yemen',
      },
      ZM: {
        id: 'option.addressCountry.ZM',
        defaultMessage: 'Zambia',
      },
      ZW: {
        id: 'option.addressCountry.ZW',
        defaultMessage: 'Zimbabwe',
      },
    }),
  },
};
