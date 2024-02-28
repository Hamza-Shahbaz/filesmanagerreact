import { Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import fileStructure from '../assets/fileStructure.json';

const FilesManager = ({previousFolder, item}) => {

    const [internalFile, setInternalFile] = useState("")
    const refVal = useRef("")

    const size = {
        margin:'2rem',
        width: '8rem',
        height: '6rem',
        backgroundColor:'white',
        display: 'flex',
        flexDirection: 'column', // Ensure items are stacked vertically
        justifyContent: 'space-between',
        alignItems:'center',
        ":hover" : {
            borderRadius:'2rem'
        }
    }

    const itemsList = item.map((elem) => {
        if (elem.type == "Folder") {
            return <Box sx={size} onDoubleClick={() => handleClick(elem)}>
                <FolderIcon sx={{fontSize:'4rem'}}/>
                <Typography>{elem.name}</Typography>
            </Box>
        }
        if (elem.type == "Image") {
            return <Box sx={size} onDoubleClick={() => handleClick(elem)}>
                <img src={`/src/assets/${elem.thumbnail}`} width="40rem" height="40rem"/>
                <Typography >{elem.name}.{elem.format}</Typography>
            </Box>
        }
        if (elem.type == "Document") {
            return <Box sx={size} onDoubleClick={() => handleClick(elem)}>
                <InsertDriveFileIcon sx={{fontSize:'4rem'}}/>
                <Typography>{elem.name}.{elem.format}</Typography>
            </Box>
        }
    })

    const handleClick = (elem) => {
        setInternalFile(elem)
    }

    const handlePreviousFolder = () => {
        let folders = previousFolder.split("/")
        let newName = ""
        let elem = fileStructure.files
        for (let i=1; i<folders.length-1 ;i++) {
            newName += "/" + folders[i]
            elem = elem.filter((elem) => elem.name == folders[i])[0].children
        }
        refVal.current = newName
        var newInternalFile = {
            name : '',
            children : elem
        }
        setInternalFile(newInternalFile)
    }
    
    return (
        <Box sx={{
            display:'flex',
            flexDirection:'row',
            backgroundColor:'black'
        }}>
            {previousFolder && internalFile == "" && <Box sx={size} onDoubleClick={() => handlePreviousFolder()}>
                <FolderIcon sx={{fontSize:'4rem'}}/>
                <Typography>...</Typography>
            </Box>}
            { internalFile == "" ?  itemsList : (internalFile.name != "" ? <FilesManager previousFolder={previousFolder + '/' + internalFile.name} item={internalFile.children} /> : <FilesManager previousFolder={refVal.current} item={internalFile.children}/>)}
        </Box>
    )
}

export default FilesManager