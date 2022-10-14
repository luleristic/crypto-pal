import SettingsForm from './SettingsForm'
import classes from './SettingsLayout.module.css'

function SettingsLayout() {
  return (
    <div className="container">
      <div className={classes.layout}>
        <SettingsForm></SettingsForm>
      </div>
    </div>
  )
}

export default SettingsLayout