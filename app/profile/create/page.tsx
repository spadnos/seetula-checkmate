import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import { createProfileAction, fetchProfile } from "@/utils/actions";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/checklist";

async function CreateProfile() {
  // get next auth user
  const user = await fetchProfile(false);

  if (user) redirect("/checklists");
  await createUser();
  redirect("/checklists");

  // currently not in use. Eventually I will probably want to add a profile to the db
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProfileAction}>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <FormInput type="text" name="firstName" label="First Name" />
            <FormInput type="text" name="lastName" label="Last Name" />
            <FormInput type="text" name="username" label="Username" />
          </div>
          <SubmitButton text="Create Profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfile;
