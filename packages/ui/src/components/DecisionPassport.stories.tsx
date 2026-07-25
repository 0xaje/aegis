import { DecisionPassport } from './DecisionPassport.js';

export default {
  title: 'Fintech/DecisionPassport',
  component: DecisionPassport,
};

export const Verified = () => (
  <div className="max-w-2xl w-full p-4">
    <DecisionPassport
      enclaveId="0xae631ffbaee2310579ec1107c27181cef71249b63"
      codeHash="3d8f7ca53789d4bba65a9530de7bd0709d005fe4"
      signature="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Yl5c5L1x49Dlh623r5f2S6p6V/B5c6t52627c27d8e203c2bb6f4f24c3d82dbf029b9f71c4c81a1795c328db9f18a28f8021c322bb1...[SEALED]"
      attestationReportSample="PASSED: AMD_SEV_SNP_ROOT_KEY_VERIFIED"
    />
  </div>
);
