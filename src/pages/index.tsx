import React from 'react';

import SubscriptionsInitializer from 'containers/SubscriptionsInitializer';
import ChildrenComponents from 'components/ChildrenComponents';
import { useFakeApiSubscriptions } from 'initializers/useFakeApiSubscriptions';

const IndexPage: React.FC = () => {
  // NOTE - this is not really the root of the app (Gatsy handles it differently)
  // I'm just treating the index page as if it's the only page of the app
  // Let's pretend that this is near app root level

  // happens once - initialize FakeAPI state and its subscriptions via hook
  useFakeApiSubscriptions();
  // TODO can separate other api subscriptions / initializers into another hook
  // useAnotherApiListeners();
  // useFirebaseListeners();
  // useAgoraListeners();

  return (
    <div>
      <ChildrenComponents />
    </div>
  );
};

export default IndexPage;
