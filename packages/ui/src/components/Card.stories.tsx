import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card.js';

export default {
  title: 'Atomic/Card',
  component: Card,
};

export const Default = () => (
  <div className="max-w-md w-full p-4">
    <Card>
      <CardHeader>
        <CardTitle>Enclave Secure Context</CardTitle>
        <CardDescription>
          Verify the cryptographic state parameters of target hosts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Calculations are run entirely inside AMD SEV-SNP isolated hardware memory shields. Signature
        hashes verify code measurement integrity.
      </CardContent>
      <CardFooter>
        <span className="text-[10px] text-slate-500 font-mono">ID: AMD-SNP-0x12</span>
        <span className="text-emerald-400 font-semibold text-[10px]">Attested</span>
      </CardFooter>
    </Card>
  </div>
);
