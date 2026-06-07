

export const profile = (req , res) => {
  const {profile} = req.body;

  try {
    if ( !profile){
      return res.status(400).json({message: "no profile pic"});
    }
  } catch (error) {
    console.log("error in profile controller" , error);
    res.status(500).json({message: " server error "})
    
  }
}