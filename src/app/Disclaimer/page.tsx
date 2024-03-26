import Link from 'next/link';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Disclaimer</h1>
      <p>
        Welcome to our website. By using this website, you accept this disclaimer in full. If you disagree with any part of this disclaimer, you must not use this website.
      </p>
      <h2>PayPal Payments</h2>
      <p>
        We offer PayPal payments for testing purposes only. Please note that this is a test website and no payments will be processed. Users are advised not to enter any real payment information.
      </p>
      <h2>No Refunds</h2>
      <p>
        As this is a test website, we do not offer any products or services for sale. Therefore, no refunds will be issued for any transactions made on this website.
      </p>
      <h2>Legal Disclaimer</h2>
      <p>
        This website is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided on this website.
      </p>
      <p>
        Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal, financial, or medical matter, you should consult an appropriate professional.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        We will not be liable to you (whether under the law of contract, the law of torts, or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:
      </p>
      <ul>
        <li>for any direct loss;</li>
        <li>for any indirect, special, or consequential loss; or</li>
        <li>for any business losses, loss of revenue, income, profits, or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>
      </ul>
      <p>
        These limitations of liability apply even if we have been expressly advised of the potential loss.
      </p>
      <p>
        By using this website, you agree that the exclusions and limitations of liability set out in this disclaimer are reasonable. If you do not think they are reasonable, you must not use this website.
      </p>
      <p>
        You accept that, as a limited liability entity, we have an interest in limiting the personal liability of our officers and employees. You agree that you will not bring any claim personally against our officers or employees in respect of any losses you suffer in connection with the website.
      </p>
      <p>
        Without prejudice to the foregoing paragraph, you agree that the limitations of warranties and liability set out in this disclaimer will protect our officers, employees, agents, subsidiaries, successors, assigns, and sub-contractors as well as this website.
      </p>
      <h2>Other Websites</h2>
      <p>
        This website may contain links to other websites. We are not responsible for the content or privacy policies of any third-party websites that may be linked to from this website.
      </p>
      <h2>Changes to Disclaimer</h2>
      <p>
        We reserve the right to update or change this disclaimer at any time. It is your responsibility to review this disclaimer periodically for changes. Your continued use of this website after we post any modifications to the disclaimer on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified disclaimer.
      </p>
      <h2>Contact Information</h2>
      <p>
        If you have any questions about this disclaimer, please <Link href="/contact" className="blue-500 underline">contact us</Link>.
      </p>
    </div>
  );
};

export default DisclaimerPage;
