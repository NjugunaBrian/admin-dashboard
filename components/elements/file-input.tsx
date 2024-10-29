import { FileResponse } from "@/lib/types";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { MultiUploader } from "./custom-uploader";

const FileInput = ({ addFiles, triggerDialog } : { addFiles: (to: FileResponse[]) => void, triggerDialog: (to: boolean) => void}) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                    <MultiUploader addFiles={addFiles} triggerDialog={triggerDialog} />
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )

}

export default FileInput;