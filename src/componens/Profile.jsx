import { useAuth } from "../context/authContext";
import CreateProfile from "./CreateProfile";
import DisplayProfile from "./DisplayProfile";

function Profile() {
    const { profile, isLoading } = useAuth();

    return (
        <div>
            {Object.keys(profile).length > 0 && !isLoading ? (
                <DisplayProfile profile={profile} />
            ) : (
                <CreateProfile />
            )}
        </div>
    );
}

export default Profile;
