import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import TripsClient from "./PropertiesClient";
import { SafeListing } from "../types";
import getUserProperties from "../actions/getProperties";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const properties = await getUserProperties(currentUser.id);

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No property found"
          subtitle="Looks like you haven't reserved any property."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        properties={properties as SafeListing[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PropertiesPage;
