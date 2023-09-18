import ProfileForm from "../components/ProfileForm";
import Container from "../components/ui/Container";

const Account = () => {
  return (
    <Container>
      <section>
        <div>
          <h3 className="text-lg font-bold">Account</h3>
          <p className="text-sm text-neutral-400">
            Manage your account profile
          </p>
          <div className="border-b my-3" />
        </div>
        <div className="shadow-sm bg-gray-50 rounded-sm p-5 mt-5">
          <div>
            <h3 className="text-base font-bold">Profile Information</h3>
            <p className="text-sm text-neutral-400">
              Update your account&apos;s profile
            </p>
          </div>
          <div>
            <ProfileForm />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Account;
