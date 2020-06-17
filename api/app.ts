import { log, settings, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'

use(prisma())

settings.change({
  schema: {
    connections: {
      default: {
        extendConnection: {
          totalCount: { type: 'Int' },
        },
        includeNodesField: true,
      },
    },
  },
})

const db = new PrismaClient()

main()

async function main() {
  const result = await db.continent.count()
  if (result == 0) {
    for (const continent of continents) {
      const data = {
        id: continent.code.toLowerCase(),
        code: continent.code,
        name: continent.name,
      }
      await db.continent.create({ data: data })
    }
    for (const country of countries) {
      const data = {
        id: country.code.toLowerCase(),
        code: country.code,
        name: country.name,
        continent: { connect: { id: country.continent_code.toLowerCase() } },
      }
      await db.country.create({ data: data })
    }
    log.info('Seeded data successfully')
    log.info('Continents: ' + (await db.continent.count()))
    log.info('Countries: ' + (await db.continent.count()))
  }
  db.disconnect()
}

const continents = [
  { code: 'AF', name: 'Africa' },
  { code: 'AN', name: 'Antarctica' },
  { code: 'AS', name: 'Asia' },
  { code: 'EU', name: 'Europe' },
  { code: 'NA', name: 'North America' },
  { code: 'OC', name: 'Australia' },
  { code: 'SA', name: 'South America' },
]

const countries = [
  { code: 'AD', name: 'Andorra', continent_code: 'EU' },
  { code: 'AE', name: 'United Arab Emirates', continent_code: 'AS' },
  { code: 'AF', name: 'Afghanistan', continent_code: 'AS' },
  { code: 'AG', name: 'Antigua and Barbuda', continent_code: 'NA' },
  { code: 'AI', name: 'Anguilla', continent_code: 'NA' },
  { code: 'AL', name: 'Albania', continent_code: 'EU' },
  { code: 'AM', name: 'Armenia', continent_code: 'AS' },
  { code: 'AO', name: 'Angola', continent_code: 'AF' },
  { code: 'AQ', name: 'Antarctica', continent_code: 'AN' },
  { code: 'AR', name: 'Argentina', continent_code: 'SA' },
  { code: 'AS', name: 'American Samoa', continent_code: 'OC' },
  { code: 'AT', name: 'Austria', continent_code: 'EU' },
  { code: 'AU', name: 'Australia', continent_code: 'OC' },
  { code: 'AW', name: 'Aruba', continent_code: 'NA' },
  { code: 'AX', name: 'Åland Islands', continent_code: 'EU' },
  { code: 'AZ', name: 'Azerbaijan', continent_code: 'AS' },
  { code: 'BA', name: 'Bosnia and Herzegovina', continent_code: 'EU' },
  { code: 'BB', name: 'Barbados', continent_code: 'NA' },
  { code: 'BD', name: 'Bangladesh', continent_code: 'AS' },
  { code: 'BE', name: 'Belgium', continent_code: 'EU' },
  { code: 'BF', name: 'Burkina Faso', continent_code: 'AF' },
  { code: 'BG', name: 'Bulgaria', continent_code: 'EU' },
  { code: 'BH', name: 'Bahrain', continent_code: 'AS' },
  { code: 'BI', name: 'Burundi', continent_code: 'AF' },
  { code: 'BJ', name: 'Benin', continent_code: 'AF' },
  { code: 'BL', name: 'Saint Barthélemy', continent_code: 'NA' },
  { code: 'BM', name: 'Bermuda', continent_code: 'NA' },
  { code: 'BN', name: 'Brunei', continent_code: 'AS' },
  { code: 'BO', name: 'Bolivia', continent_code: 'SA' },
  { code: 'BQ', name: 'Bonaire', continent_code: 'NA' },
  { code: 'BR', name: 'Brazil', continent_code: 'SA' },
  { code: 'BS', name: 'Bahamas', continent_code: 'NA' },
  { code: 'BT', name: 'Bhutan', continent_code: 'AS' },
  { code: 'BV', name: 'Bouvet Island', continent_code: 'AN' },
  { code: 'BW', name: 'Botswana', continent_code: 'AF' },
  { code: 'BY', name: 'Belarus', continent_code: 'EU' },
  { code: 'BZ', name: 'Belize', continent_code: 'NA' },
  { code: 'CA', name: 'Canada', continent_code: 'NA' },
  { code: 'CC', name: 'Cocos (Keeling) Islands', continent_code: 'AS' },
  {
    code: 'CD',
    name: 'Democratic Republic of the Congo',
    continent_code: 'AF',
  },
  { code: 'CF', name: 'Central African Republic', continent_code: 'AF' },
  { code: 'CG', name: 'Republic of the Congo', continent_code: 'AF' },
  { code: 'CH', name: 'Switzerland', continent_code: 'EU' },
  { code: 'CI', name: 'Ivory Coast', continent_code: 'AF' },
  { code: 'CK', name: 'Cook Islands', continent_code: 'OC' },
  { code: 'CL', name: 'Chile', continent_code: 'SA' },
  { code: 'CM', name: 'Cameroon', continent_code: 'AF' },
  { code: 'CN', name: 'China', continent_code: 'AS' },
  { code: 'CO', name: 'Colombia', continent_code: 'SA' },
  { code: 'CR', name: 'Costa Rica', continent_code: 'NA' },
  { code: 'CU', name: 'Cuba', continent_code: 'NA' },
  { code: 'CV', name: 'Cape Verde', continent_code: 'AF' },
  { code: 'CW', name: 'Curaçao', continent_code: 'NA' },
  { code: 'CX', name: 'Christmas Island', continent_code: 'AS' },
  { code: 'CY', name: 'Cyprus', continent_code: 'AS' },
  { code: 'CZ', name: 'Czech Republic', continent_code: 'EU' },
  { code: 'DE', name: 'Germany', continent_code: 'EU' },
  { code: 'DJ', name: 'Djibouti', continent_code: 'AF' },
  { code: 'DK', name: 'Denmark', continent_code: 'EU' },
  { code: 'DM', name: 'Dominica', continent_code: 'NA' },
  { code: 'DO', name: 'Dominican Republic', continent_code: 'NA' },
  { code: 'DZ', name: 'Algeria', continent_code: 'AF' },
  { code: 'EC', name: 'Ecuador', continent_code: 'SA' },
  { code: 'EE', name: 'Estonia', continent_code: 'EU' },
  { code: 'EG', name: 'Egypt', continent_code: 'AF' },
  { code: 'EH', name: 'Western Sahara', continent_code: 'AF' },
  { code: 'ER', name: 'Eritrea', continent_code: 'AF' },
  { code: 'ES', name: 'Spain', continent_code: 'EU' },
  { code: 'ET', name: 'Ethiopia', continent_code: 'AF' },
  { code: 'FI', name: 'Finland', continent_code: 'EU' },
  { code: 'FJ', name: 'Fiji', continent_code: 'OC' },
  { code: 'FK', name: 'Falkland Islands', continent_code: 'SA' },
  { code: 'FM', name: 'Federated States of Micronesia', continent_code: 'OC' },
  { code: 'FO', name: 'Faroe Islands', continent_code: 'EU' },
  { code: 'FR', name: 'France', continent_code: 'EU' },
  { code: 'GA', name: 'Gabon', continent_code: 'AF' },
  { code: 'GB', name: 'United Kingdom', continent_code: 'EU' },
  { code: 'GD', name: 'Grenada', continent_code: 'NA' },
  { code: 'GE', name: 'Georgia', continent_code: 'AS' },
  { code: 'GF', name: 'French Guiana', continent_code: 'SA' },
  { code: 'GG', name: 'Guernsey', continent_code: 'EU' },
  { code: 'GH', name: 'Ghana', continent_code: 'AF' },
  { code: 'GI', name: 'Gibraltar', continent_code: 'EU' },
  { code: 'GL', name: 'Greenland', continent_code: 'NA' },
  { code: 'GM', name: 'Gambia', continent_code: 'AF' },
  { code: 'GN', name: 'Guinea', continent_code: 'AF' },
  { code: 'GP', name: 'Guadeloupe', continent_code: 'NA' },
  { code: 'GQ', name: 'Equatorial Guinea', continent_code: 'AF' },
  { code: 'GR', name: 'Greece', continent_code: 'EU' },
  {
    code: 'GS',
    name: 'South Georgia and the South Sandwich Islands',
    continent_code: 'AN',
  },
  { code: 'GT', name: 'Guatemala', continent_code: 'NA' },
  { code: 'GU', name: 'Guam', continent_code: 'OC' },
  { code: 'GW', name: 'Guinea-Bissau', continent_code: 'AF' },
  { code: 'GY', name: 'Guyana', continent_code: 'SA' },
  { code: 'HK', name: 'Hong Kong', continent_code: 'AS' },
  {
    code: 'HM',
    name: 'Heard Island and McDonald Islands',
    continent_code: 'AN',
  },
  { code: 'HN', name: 'Honduras', continent_code: 'NA' },
  { code: 'HR', name: 'Croatia', continent_code: 'EU' },
  { code: 'HT', name: 'Haiti', continent_code: 'NA' },
  { code: 'HU', name: 'Hungary', continent_code: 'EU' },
  { code: 'ID', name: 'Indonesia', continent_code: 'AS' },
  { code: 'IE', name: 'Ireland', continent_code: 'EU' },
  { code: 'IL', name: 'Israel', continent_code: 'AS' },
  { code: 'IM', name: 'Isle of Man', continent_code: 'EU' },
  { code: 'IN', name: 'India', continent_code: 'AS' },
  { code: 'IO', name: 'British Indian Ocean Territory', continent_code: 'AS' },
  { code: 'IQ', name: 'Iraq', continent_code: 'AS' },
  { code: 'IR', name: 'Iran', continent_code: 'AS' },
  { code: 'IS', name: 'Iceland', continent_code: 'EU' },
  { code: 'IT', name: 'Italy', continent_code: 'EU' },
  { code: 'JE', name: 'Jersey', continent_code: 'EU' },
  { code: 'JM', name: 'Jamaica', continent_code: 'NA' },
  { code: 'JO', name: 'Jordan', continent_code: 'AS' },
  { code: 'JP', name: 'Japan', continent_code: 'AS' },
  { code: 'KE', name: 'Kenya', continent_code: 'AF' },
  { code: 'KG', name: 'Kyrgyzstan', continent_code: 'AS' },
  { code: 'KH', name: 'Cambodia', continent_code: 'AS' },
  { code: 'KI', name: 'Kiribati', continent_code: 'OC' },
  { code: 'KM', name: 'Comoros', continent_code: 'AF' },
  { code: 'KN', name: 'Saint Kitts and Nevis', continent_code: 'NA' },
  { code: 'KP', name: 'North Korea', continent_code: 'AS' },
  { code: 'KR', name: 'South Korea', continent_code: 'AS' },
  { code: 'KW', name: 'Kuwait', continent_code: 'AS' },
  { code: 'KY', name: 'Cayman Islands', continent_code: 'NA' },
  { code: 'KZ', name: 'Kazakhstan', continent_code: 'AS' },
  { code: 'LA', name: 'Laos', continent_code: 'AS' },
  { code: 'LB', name: 'Lebanon', continent_code: 'AS' },
  { code: 'LC', name: 'Saint Lucia', continent_code: 'NA' },
  { code: 'LI', name: 'Liechtenstein', continent_code: 'EU' },
  { code: 'LK', name: 'Sri Lanka', continent_code: 'AS' },
  { code: 'LR', name: 'Liberia', continent_code: 'AF' },
  { code: 'LS', name: 'Lesotho', continent_code: 'AF' },
  { code: 'LT', name: 'Lithuania', continent_code: 'EU' },
  { code: 'LU', name: 'Luxembourg', continent_code: 'EU' },
  { code: 'LV', name: 'Latvia', continent_code: 'EU' },
  { code: 'LY', name: 'Libya', continent_code: 'AF' },
  { code: 'MA', name: 'Morocco', continent_code: 'AF' },
  { code: 'MC', name: 'Monaco', continent_code: 'EU' },
  { code: 'MD', name: 'Moldova', continent_code: 'EU' },
  { code: 'ME', name: 'Montenegro', continent_code: 'EU' },
  { code: 'MF', name: 'Saint Martin', continent_code: 'NA' },
  { code: 'MG', name: 'Madagascar', continent_code: 'AF' },
  { code: 'MH', name: 'Marshall Islands', continent_code: 'OC' },
  { code: 'MK', name: 'Macedonia', continent_code: 'EU' },
  { code: 'ML', name: 'Mali', continent_code: 'AF' },
  { code: 'MM', name: 'Myanmar', continent_code: 'AS' },
  { code: 'MN', name: 'Mongolia', continent_code: 'AS' },
  { code: 'MO', name: 'Macau', continent_code: 'AS' },
  { code: 'MP', name: 'Northern Mariana Islands', continent_code: 'OC' },
  { code: 'MQ', name: 'Martinique', continent_code: 'NA' },
  { code: 'MR', name: 'Mauritania', continent_code: 'AF' },
  { code: 'MS', name: 'Montserrat', continent_code: 'NA' },
  { code: 'MT', name: 'Malta', continent_code: 'EU' },
  { code: 'MU', name: 'Mauritius', continent_code: 'AF' },
  { code: 'MV', name: 'Maldives', continent_code: 'AS' },
  { code: 'MW', name: 'Malawi', continent_code: 'AF' },
  { code: 'MX', name: 'Mexico', continent_code: 'NA' },
  { code: 'MY', name: 'Malaysia', continent_code: 'AS' },
  { code: 'MZ', name: 'Mozambique', continent_code: 'AF' },
  { code: 'NA', name: 'Namibia', continent_code: 'AF' },
  { code: 'NC', name: 'New Caledonia', continent_code: 'OC' },
  { code: 'NE', name: 'Niger', continent_code: 'AF' },
  { code: 'NF', name: 'Norfolk Island', continent_code: 'OC' },
  { code: 'NG', name: 'Nigeria', continent_code: 'AF' },
  { code: 'NI', name: 'Nicaragua', continent_code: 'NA' },
  { code: 'NL', name: 'Netherlands', continent_code: 'EU' },
  { code: 'NO', name: 'Norway', continent_code: 'EU' },
  { code: 'NP', name: 'Nepal', continent_code: 'AS' },
  { code: 'NR', name: 'Nauru', continent_code: 'OC' },
  { code: 'NU', name: 'Niue', continent_code: 'OC' },
  { code: 'NZ', name: 'New Zealand', continent_code: 'OC' },
  { code: 'OM', name: 'Oman', continent_code: 'AS' },
  { code: 'PA', name: 'Panama', continent_code: 'NA' },
  { code: 'PE', name: 'Peru', continent_code: 'SA' },
  { code: 'PF', name: 'French Polynesia', continent_code: 'OC' },
  { code: 'PG', name: 'Papua New Guinea', continent_code: 'OC' },
  { code: 'PH', name: 'Philippines', continent_code: 'AS' },
  { code: 'PK', name: 'Pakistan', continent_code: 'AS' },
  { code: 'PL', name: 'Poland', continent_code: 'EU' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', continent_code: 'NA' },
  { code: 'PN', name: 'Pitcairn Islands', continent_code: 'OC' },
  { code: 'PR', name: 'Puerto Rico', continent_code: 'NA' },
  { code: 'PS', name: 'Palestine', continent_code: 'AS' },
  { code: 'PT', name: 'Portugal', continent_code: 'EU' },
  { code: 'PW', name: 'Palau', continent_code: 'OC' },
  { code: 'PY', name: 'Paraguay', continent_code: 'SA' },
  { code: 'QA', name: 'Qatar', continent_code: 'AS' },
  { code: 'RE', name: 'Réunion', continent_code: 'AF' },
  { code: 'RO', name: 'Romania', continent_code: 'EU' },
  { code: 'RS', name: 'Serbia', continent_code: 'EU' },
  { code: 'RU', name: 'Russia', continent_code: 'EU' },
  { code: 'RW', name: 'Rwanda', continent_code: 'AF' },
  { code: 'SA', name: 'Saudi Arabia', continent_code: 'AS' },
  { code: 'SB', name: 'Solomon Islands', continent_code: 'OC' },
  { code: 'SC', name: 'Seychelles', continent_code: 'AF' },
  { code: 'SD', name: 'Sudan', continent_code: 'AF' },
  { code: 'SE', name: 'Sweden', continent_code: 'EU' },
  { code: 'SG', name: 'Singapore', continent_code: 'AS' },
  {
    code: 'SH',
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    continent_code: 'AF',
  },
  { code: 'SI', name: 'Slovenia', continent_code: 'EU' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', continent_code: 'EU' },
  { code: 'SK', name: 'Slovakia', continent_code: 'EU' },
  { code: 'SL', name: 'Sierra Leone', continent_code: 'AF' },
  { code: 'SM', name: 'San Marino', continent_code: 'EU' },
  { code: 'SN', name: 'Senegal', continent_code: 'AF' },
  { code: 'SO', name: 'Somalia', continent_code: 'AF' },
  { code: 'SR', name: 'Suriname', continent_code: 'SA' },
  { code: 'SS', name: 'South Sudan', continent_code: 'AF' },
  { code: 'ST', name: 'São Tomé and Príncipe', continent_code: 'AF' },
  { code: 'SV', name: 'El Salvador', continent_code: 'NA' },
  { code: 'SX', name: 'Sint Maarten', continent_code: 'NA' },
  { code: 'SY', name: 'Syria', continent_code: 'AS' },
  { code: 'SZ', name: 'Swaziland', continent_code: 'AF' },
  { code: 'TC', name: 'Turks and Caicos Islands', continent_code: 'NA' },
  { code: 'TD', name: 'Chad', continent_code: 'AF' },
  { code: 'TF', name: 'French Southern Territories', continent_code: 'AN' },
  { code: 'TG', name: 'Togo', continent_code: 'AF' },
  { code: 'TH', name: 'Thailand', continent_code: 'AS' },
  { code: 'TJ', name: 'Tajikistan', continent_code: 'AS' },
  { code: 'TK', name: 'Tokelau', continent_code: 'OC' },
  { code: 'TL', name: 'East Timor', continent_code: 'AS' },
  { code: 'TM', name: 'Turkmenistan', continent_code: 'AS' },
  { code: 'TN', name: 'Tunisia', continent_code: 'AF' },
  { code: 'TO', name: 'Tonga', continent_code: 'OC' },
  { code: 'TR', name: 'Turkey', continent_code: 'EU' },
  { code: 'TT', name: 'Trinidad and Tobago', continent_code: 'NA' },
  { code: 'TV', name: 'Tuvalu', continent_code: 'OC' },
  { code: 'TW', name: 'Taiwan', continent_code: 'AS' },
  { code: 'TZ', name: 'Tanzania', continent_code: 'AF' },
  { code: 'UA', name: 'Ukraine', continent_code: 'EU' },
  { code: 'UG', name: 'Uganda', continent_code: 'AF' },
  {
    code: 'UM',
    name: 'United States Minor Outlying Islands',
    continent_code: 'OC',
  },
  { code: 'US', name: 'United States of America', continent_code: 'NA' },
  { code: 'UY', name: 'Uruguay', continent_code: 'SA' },
  { code: 'UZ', name: 'Uzbekistan', continent_code: 'AS' },
  { code: 'VA', name: 'Vatican City', continent_code: 'EU' },
  {
    code: 'VC',
    name: 'Saint Vincent and the Grenadines',
    continent_code: 'NA',
  },
  { code: 'VE', name: 'Venezuela', continent_code: 'SA' },
  { code: 'VG', name: 'British Virgin Islands', continent_code: 'NA' },
  { code: 'VI', name: 'United States Virgin Islands', continent_code: 'NA' },
  { code: 'VN', name: 'Vietnam', continent_code: 'AS' },
  { code: 'VU', name: 'Vanuatu', continent_code: 'OC' },
  { code: 'WF', name: 'Wallis and Futuna', continent_code: 'OC' },
  { code: 'WS', name: 'Samoa', continent_code: 'OC' },
  { code: 'YE', name: 'Yemen', continent_code: 'AS' },
  { code: 'YT', name: 'Mayotte', continent_code: 'AF' },
  { code: 'ZA', name: 'South Africa', continent_code: 'AF' },
  { code: 'ZM', name: 'Zambia', continent_code: 'AF' },
  { code: 'ZW', name: 'Zimbabwe', continent_code: 'AF' },
]
