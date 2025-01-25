import add_patient from "./add_patients"
import delete_patient from "./delete_patient"
import edit_patient from "./edit_patients"
import get_patients from "./get_patients"
import get_single_patient from "./get_single_patient"

const patientsController = {
  get_patients,
  add_patient,
  edit_patient,
  get_single_patient,
  delete_patient,
}
export default patientsController
