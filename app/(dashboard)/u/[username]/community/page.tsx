import { getBockedUser } from "@/modules/dashboard/actions";
import { columns } from "@/modules/dashboard/components/column";
import { DataTable } from "@/modules/dashboard/components/data-table";
import { format } from "date-fns";

const CommunityPage = async () => {
    const blockedUser = await getBockedUser();
    console.log(blockedUser);
    const formattedData = blockedUser.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.imageUrl,
        username: block.blocked.username,
        createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy")
    }))
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Community Settings
                </h1>
            </div>
            <DataTable columns={columns} data={formattedData} />
        </div>
    )
}

export default CommunityPage;