import SettingsLayout from "../components/settings/SettingsLayout"
import UseAuth from "../helpers/UseAuth"


function Settings() {
  return (
    <>
      <UseAuth></UseAuth>
      <SettingsLayout></SettingsLayout>
    </>
  )
}

export default Settings