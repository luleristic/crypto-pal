import UseAuth from "../helpers/UseAuth";
import InboxLayout from "../components/inbox/InboxLayout";

function Inbox() {
  return (
    <>
      <UseAuth></UseAuth>
      <InboxLayout></InboxLayout>
    </>
  );
}

export default Inbox;
