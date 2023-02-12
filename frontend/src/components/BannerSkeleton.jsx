import {Box, Skeleton} from '@mui/material'

export default function BannerSkeleton() {
  return (
    <Box sx={{padding: 1,width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Skeleton variant="rectangular" width='auto' height={140} />
        <Skeleton variant="text" sx={{fontSize: '3rem'}} width='80%' />
        <Box sx={{display: 'flex', justifyContent: 'space-between', paddingX: 2, gap: 1, paddingTop:1 }}>
        <Skeleton variant="rectangular" width='50%' height={35} />
        <Skeleton variant="rectangular" width='50%' height={35} />
        </Box>

    </Box>)
}
