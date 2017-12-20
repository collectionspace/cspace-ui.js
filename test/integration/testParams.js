/* eslint-disable array-bracket-spacing, max-len, no-multi-spaces */

global.testParams = {
  adminUser: {
    username: 'admin@core.collectionspace.org',
    password: 'Administrator',
    screenName: 'Administrator',
  },

  /*
   * Specify the record types that should be visible in the system. For each, supply an array that
   * contains the service type, name (that appears in URLs), display name (that appears on pages
   * and may be localized), and collective display name (that also appears on pages and may be
   * localized).
   */

  visibleRecordTypes: [
    /*
     Service Type   Name                  Display Name                     Collective Display Name
    ======================================================================================================
    */
    ['object',      'collectionobject',   'Object',                        'Objects'                    ],
    ['procedure',   'acquisition',        'Acquisition',                   'Acquisitions'               ],
    ['procedure',   'conditioncheck',     'Condition Check',               'Condition Checks'           ],
    ['procedure',   'conservation',       'Conservation',                  'Conservation Treatments'    ],
    ['procedure',   'exhibition',         'Exhibition',                    'Exhibitions'                ],
    ['procedure',   'group',              'Group',                         'Groups'                     ],
    ['procedure',   'intake',             'Intake',                        'Intakes'                    ],
    ['procedure',   'loanin',             'Loan In',                       'Loans In'                   ],
    ['procedure',   'loanout',            'Loan Out',                      'Loans Out'                  ],
    ['procedure',   'movement',           'Location/Movement/Inventory',   'Location/Movement/Inventory'],
    ['procedure',   'media',              'Media Handling',                'Media Handling'             ],
    ['procedure',   'objectexit',         'Object Exit',                   'Object Exits'               ],
    ['procedure',   'valuation',          'Valuation Control',             'Valuation Controls'         ],
    ['authority',   'citation',           'Citation',                      'Citations'                  ],
    ['authority',   'concept',            'Concept',                       'Concepts'                   ],
    ['authority',   'organization',       'Organization',                  'Organizations'              ],
    ['authority',   'person',             'Person',                        'Persons'                    ],
    ['authority',   'place',              'Place',                         'Places'                     ],
    ['authority',   'location',           'Storage Location',              'Storage Locations'          ],
    ['authority',   'work',               'Work',                          'Works'                      ],
  ],

  /*
   * Specify the vocabularies that should be visible in the system for each visible authority. For
   * each, supply an array that contains the authority name, the vocabulary name (that appears in
   * URLs), and display name (that appears on pages and may be localized).
   */

  visibleVocabularies: [
    /*
     Authority Name    Name            Display Name
    =================================================
    */
    ['citation',       'local',        'Local'     ],
    ['citation',       'worldcat',     'WorldCat'  ],
    ['concept',        'activity',     'Activity'  ],
    ['concept',        'associated',   'Associated'],
    ['concept',        'material',     'Material'  ],
    ['organization',   'local',        'Local'     ],
    ['organization',   'ulan',         'ULAN'      ],
    ['person',         'local',        'Local'     ],
    ['person',         'ulan',         'ULAN'      ],
    ['place',          'local',        'Local'     ],
    ['place',          'tgn',          'TGN'       ],
    ['location',       'local',        'Local'     ],
    ['location',       'offsite',      'Offsite'   ],
    ['work',           'local',        'Local'     ],
    ['work',           'cona',         'CONA'      ],
  ],

  /*
   * Specify the record types that should be hidden. For each, supply a string that is the name of
   * the record. (This is the name that appears in URLs.)
   */

  hiddenRecordTypes: [],

  /*
   * Specify the vocabularies that should be hidden for each authority. For each, supply an array
   * that contains the authority name and the vocabulary name. (These are the names that appear in
   * URLs.)
   */

  hiddenVocabularies: [],
};
