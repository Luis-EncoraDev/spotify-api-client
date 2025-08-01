import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';
import type { Track } from '../interfaces';

interface PopularSongsTableProps {
  popularTracks: Track[],
  setTrackPlaying (trackId: string) : void;
}

const PopularTracksTable: React.FC<PopularSongsTableProps> = ({ popularTracks, setTrackPlaying }) => {

  const formatMilliseconds = (ms: number):string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "transparent", borderRadius: "10px"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ fontWeight: "bold"}}>#</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold"}}>Image</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold"}}>Song name</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold"}}>Song length</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {popularTracks.map((track, index) => (
            <TableRow
              key={track.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' sx={{ width: "1rem" }}>
                {index + 1}
              </TableCell>
              <TableCell align='center' sx={{ width: "6rem", justifyItems: "center"}}>
                <img src={track.album.images[0].url} className="h-[50px] w-[50px] rounded-[25px]"/>
              </TableCell>
              <TableCell align='center' sx={{ width: "16rem" }}>
                <div onClick={() => setTrackPlaying(track.id)}>
                  <Card
                    sx={{ width: "fit-content", padding: "0.5rem", justifySelf: "center", backgroundColor: "transparent", cursor: "pointer", transition: "ease 0.3s" }} 
                    className="hover:scale-110 hover:bg-[#32a88d]"
                    >
                    {track.name}
                  </Card>
                </div>
              </TableCell>
              <TableCell align='center' sx={{ width: "8rem" }}>{formatMilliseconds(track.duration_ms)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopularTracksTable;