import User from '../models/User.Model.js';

export const registerUser = async (req, res)=>{
    try{
        let {email, password, passwordCheck } = req.body;

        if(!email || !password || !passwordCheck){
            return res.status(400).json({msg: "Enter all Fields."});
        }

        if(password.length < 5){
            return res.status(400).json({msg: "The password needs to be at leasr 5 characters long."});
        }

        if(password !== passwordCheck){
            return res.status(400).json({msg: "Enter the same password twice for verification."});
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(400).json({msg:"An account already exsists."});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    }catch(err){
        res.staus(500).json({error: err.message});
    }
}

export const userLogin = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({msg:"Enter all fields"});
        }
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(402).json({msg: "No account with this email has been registered."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(403).json({msg: "Invalid credentials."});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id: user._id,
                displayName: user.email,
            }
        });
    }catch(err){
        res.status(500).json({error: err.message});
        console.log(err.message);
    }

}

export const tokenIsValid = async(req,res)=>{
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const defaultAction = async(req, res)=>{
    console.log("Test");
    const user = await User.findById(req.user);
    res.json({
        displayName: user.email,
        id: user._id,
    });
}