import RateModel from "../models/Rate";

// @desc      Get all rates
// @route     GET /users/:userID/posts/:postID/rates
// @access    Public
export const createRate = async (req: Request, res: Response, next: NextFunction) => {
