import CreateEmail from "../_components/email/createEmail"

type Props = {}

export default async function Page({ }: Props) {

    return (
        <div className="m-4">
            <CreateEmail/>
        </div>
    )
}
