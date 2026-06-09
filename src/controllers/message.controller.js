

export const profile = (req , res) => {
  const {profile} = req.body;

  try {
    if ( !profile){
      return res.status(400).json({message: "no profile pic"});
    }

    // In a real app, you would process the profile picture (e.g., upload to cloud storage)
    return res.status(200).json({ message: "Profile updated successfully (mock)" });
  } catch (error) {
    console.log("error in profile controller" , error);
    res.status(500).json({message: " server error "})
    
  }
}