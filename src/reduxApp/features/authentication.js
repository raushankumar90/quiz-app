import { createSlice } from "@reduxjs/toolkit";
import { account } from "../../components/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MyUserData } from "../../components/utils/utils";

let initialState = { 
        user: null,
        isAuthenticated: false,
        status: "loading", // at first render its loading to check
        error: null,
        loginMethod:null
}

export const getUser = createAsyncThunk(
    "authentication/appwriteuser",
    async(_,{rejectWithValue})=>{
       try{
        const user = await account.get()
        return user
       }catch(e){
        rejectWithValue(e.message)
       }
    }
)
// Async thunk for login using Appwrite's createEmailPasswordSession
export const login = createAsyncThunk(
    "authentication/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response
        } catch (error) {
            if(error.message.includes("Invalid credentials")) return rejectWithValue("Invalid credentials , Please sigunup to continue")
            return rejectWithValue(error.message);
        }
    }
);
 export const googleLogin = createAsyncThunk(
    "authentication/googleLogin",
    async(_,{rejectWithValue})=>{
        try{
            await MyUserData.createOAuthSession()
            return getUser()
        }catch(e){
            return rejectWithValue(e)
        }
    }
 )
// Async thunk for logout using Appwrite's deleteSession
export const logout = createAsyncThunk(
    "authentication/logout",
    async (_, { getState,dispatch,rejectWithValue}) => {
        try {
            const state = getState()
            if(state.authentication.loginMethod === "appwrite"){
            await account.deleteSession("current");
            }
            dispatch(resetAuthSlice())
            return "unAuthenticated"
        } catch (error) {
            return rejectWithValue(error.message);
        }
       
    }
);

export const signup = createAsyncThunk(
    'authentication/signup',
    async({email,password,fullname},{rejectWithValue,dispatch})=>{
        try{
            const newUser = await MyUserData.makeNewAccount(email,password,fullname)
            // if(newUser) dispatch(login({email,password}))
            // console.log(newUser)
            return newUser
        }catch(e){
            // console.log(e)
            return rejectWithValue(e)
        }
    }
)

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        },
        setStatus:(state,action)=>{
            state.status = action.payload;
        },
        resetAuthSlice:(state)=>{
            state.user =null;
            state.isAuthenticated = false;
            state.loginMethod = null;
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending,(state)=>{
                state.status = "loading";
                state.error = null
            })
            .addCase(getUser.fulfilled,(state,action)=>{
                if(action.payload){
                state.isAuthenticated = true;
                state.user = action.payload
                state.status = "authenticated";
                state.error = null;
                state.loginMethod = "appwrite"
                }else{
                    state.user = null
                    state.isAuthenticated =false
                    state.status = "unAuthenticated"
                }
            })
            .addCase(getUser.rejected,(state,action)=>{
                state.status = "unAuthenticated";
                state.isAuthenticated = false
                state.user = null
                state.error = "no user found"
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "authenticated";
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loginMethod = "appwrite"
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "unAuthenticated";
                state.error = action.payload;
                state.isAuthenticated = false
                state.loginMethod = null
                state.user = null
            })
            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "unAuthenticated";
                state.user = null;
                state.isAuthenticated = false;
                state.loginMethod = null
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "Authenticated"
                state.error = action.payload;
                
            })
            .addCase(signup.pending,(state)=>{
                state.status = "loading";
                state.error = null;
            })
            .addCase(signup.fulfilled,(state,action)=>{
                state.isAuthenticated = true;
                state.error =null;
                state.loginMethod = "appwrite";
                state.status = "authenticated"
                state.user = action.payload
            })
            .addCase(signup.rejected,(state,action)=>{
                state.error = action.payload;
                state.status = 'unAuthenticated'
                state.user = null
                state.loginMethod = null
                state.isAuthenticated = false
            })
            .addCase(googleLogin.pending,(state)=>{
                state.error = null
                state.status = 'loading'
            })
            .addCase(googleLogin.fulfilled,(state,action)=>{
                state.error = null
                state.status = 'authenticated'
                state.isAuthenticated = true
                state.user = action.payload
                state.loginMethod = "google"
            })
            .addCase(googleLogin.rejected,(state,action)=>{
                state.error = action.payload
                state.isAuthenticated = false
                state.loginMethod = null
                state.status = "unAuthenticated"
                state.user = null
            })
    },
});

export const { setUser, setError, setStatus,resetAuthSlice } = authenticationSlice.actions;

// export { login, logout };
export default authenticationSlice.reducer;