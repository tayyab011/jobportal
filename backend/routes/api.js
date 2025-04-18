import  express from 'express';
import * as userController from "../controllers/userController.js";
import * as copmanyController from "../controllers/copmanyController.js";
import * as jobController from "../controllers/jobController.js";
import * as applicationController from "../controllers/applicationController.js";
import isAuthenticated from '../middleware/AuthMiddleware.js';
import { singleUpload } from '../middleware/multer.js';


 const router = express.Router();



 //user

 router.post("/register",singleUpload, userController.register);
 router.post("/login", userController.login);
 router.put(
   "/update",
   isAuthenticated,
   singleUpload, userController.updateProfile
 );
 router.get("/logout", userController.logout);



 //company
 
 router.post("/registerCompany",isAuthenticated, copmanyController.registerCompany);
 router.get("/getCompany",isAuthenticated, copmanyController.getCompany);
 router.get("/getCompanyId/:id",isAuthenticated, copmanyController.getCompanyId);
 router.put(
   "/updateCompany/:id",
   isAuthenticated,
   singleUpload,
   copmanyController.updateCompany
 );
/*  routhinh bananor time isauthenticatd sob jaygay dite hobe */



//job
 router.post("/registerjob", isAuthenticated, jobController.postJob);
 router.get("/getallJob", isAuthenticated, jobController.getallJob);
 router.get("/getAdminsJob", isAuthenticated, jobController.getAdminsJob);
 router.get("/getJobById/:id", isAuthenticated, jobController.getJobById);





//application

  router.get("/applyJob/:id", isAuthenticated, applicationController.applyJob);
  router.get("/getApplyJobs",isAuthenticated,applicationController.getApplyJobs);
  router.get(
    "/:id/getApplicents",
    isAuthenticated,
    applicationController.getApplicents
  );
    router.post(
      "/status/:id/UpdateStatus",
      isAuthenticated,
      applicationController.UpdateStatus
    );
 export default router;