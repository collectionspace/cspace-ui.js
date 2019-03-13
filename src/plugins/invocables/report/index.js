import coreAcquisition from './coreAcquisition';
import SystematicInventory from './SystematicInventory';
import SystematicInventoryUI from './SystematicInventoryUI';
import bampfaImageMetadata from './bampfaImageMetadata';
import ComponentCheck from './ComponentCheck';
import HsrPhaseOneInventory from './HsrPhaseOneInventory';
import govholdings from './govholdings';
import ComponentCheckSubReport from './ComponentCheckSubReport';
import SystematicInventoryHSR from './SystematicInventoryHSR';
import ucbgDeadReportRange from './ucbgDeadReportRange';
import ucbgDiedInLocation from './ucbgDiedInLocation';
import ucbgRareStatusFamily from './ucbgRareStatusFamily';
import ucbgRareStatusGenus from './ucbgRareStatusGenus';
import ucbgVoucherFamily from './ucbgVoucherFamily';
import ucbgVoucherGenus from './ucbgVoucherGenus';
// import ucbgAccessionCount from './ucbgAccessionCount';
// import ucbgListofLivingAccessions from './ucbgListofLivingAccessions';
// import ucbgTaxonCount from './ucbgTaxonCount';


export default [
  coreAcquisition,
  SystematicInventory,
  SystematicInventoryUI,
  bampfaImageMetadata,
  ComponentCheck,
  HsrPhaseOneInventory,
  govholdings,
  ComponentCheckSubReport,
  SystematicInventoryHSR,
  ucbgDeadReportRange,
  ucbgDiedInLocation,
  ucbgRareStatusFamily,
  ucbgRareStatusGenus,
  ucbgVoucherFamily,
  ucbgVoucherGenus,
  // ucbgAccessionCount, //No parameters, no doctype. Works if put it in the collectionobjects tab
  // ucbgListofLivingAccessions, // same as above
  // ucbgTaxonCount, // same as above
];
