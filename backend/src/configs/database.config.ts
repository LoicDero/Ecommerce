import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    console.log("Connecting to the DB")
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("Connect successfully to the DB"),
        (error) => console.log(error)
    )
}