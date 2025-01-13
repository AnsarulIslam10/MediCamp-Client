import Lottie from 'lottie-react';
import loadingSpinner from "../../assets/animation/LoadingAnimation.json"
const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Lottie className='w-40' animationData={loadingSpinner}></Lottie>
        </div>
    );
};

export default Loading;