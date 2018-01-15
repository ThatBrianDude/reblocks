import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { ChangeEvent } from 'react';

import { ACCOUNT_ID, PaymentResponse, ReblocksButton } from '../reblocks';

interface State {
  accountId: string;
  amount: number;
}

class PaymentForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { accountId: ACCOUNT_ID, amount: 10000 };
  }

  onChangeAccountId = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    this.setState({ accountId: event.currentTarget.value });
  };

  onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    this.setState({ amount: parseFloat(event.currentTarget.value) });
  };

  render() {
    return (
      <form>
        <p>
          Filling in the form below will dynamically change the payment button with the new account
          and amount specified
        </p>
        <fieldset>
          <label>Account ID</label>
          <input
            type="text"
            value={this.state.accountId}
            placeholder="Account ID"
            onChange={this.onChangeAccountId}
          />
          <label>Amount (in rai, 1,000,000 rai = 1 XRB)</label>

          <input
            type="number"
            value={this.state.amount}
            placeholder="Amount of rai"
            onChange={this.onChangeAmount}
          />
          <ReblocksButton
            accountId={this.state.accountId}
            amount={this.state.amount}
            onPaymentSuccess={onSuccess}
          />
        </fieldset>
      </form>
    );
  }
}

const onSuccess = (data: PaymentResponse) => {
  action('Payment successful.')();
  action(`Transaction ID: ${data.token}`)();
};

storiesOf('ReblocksButton', module)
  .add('Small test transaction', () => {
    action('Click the button to start payment')();

    return (
      <div>
        <p>The button below will prompt you to send a test transaction of 1000 rai (~2 cents)</p>
        <ReblocksButton accountId={ACCOUNT_ID} amount={1000} onPaymentSuccess={onSuccess} />
      </div>
    );
  })
  .add('Dynamic Button', () => {
    return <PaymentForm />;
  })
  .add('Buy Dan a 🍺', () => {
    return (
      <div>
        <p>
          If you want to help support the project, you can donate a beer's worth of rai using this
          form
        </p>
        <ReblocksButton accountId={ACCOUNT_ID} amount={250000} onPaymentSuccess={onSuccess} />
        <p style={{ marginTop: 30 }}>
          ...or you can donate a different amount to
          xrb_3ritoyx4zcixshfbezg4aycb49xbupw9ggink1rfm43tm6uh87t4ifuxg5dm
        </p>
      </div>
    );
  });
