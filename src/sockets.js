
export default function bindSockets(io) {
  io.on('connection', (socket) => {
    console.log('CONNECTED TO SOCKET')
    socket.on('join-party-host', (data) => {
      console.log('HOST JOINED', { data})
      const { partyId } = data

      socket.join(partyId)
    })

    socket.on('join-party-team', (data) => {
      const { partyId, teamName, teamId } = data
      console.log('TEAM JOINED', { data })
      socket.join(partyId)

      io.to(partyId).emit('team-joined', {
        from: socket.id,
        payload: {
          teamName,
          teamId,
        }
      })
    })

    socket.on('leave-party', (data) => {
      io.to(data.partyId).emit('finish-game')
    })

    socket.on('attacking-time', (data) => {
      io.to(data.partyId).emit('attacking-time', {
        from: socket.id,
        payload: {
          attacking: true,
        },
      })
    })

    socket.on('attack-message', (data) => {
      const { partyId, attackingTeam, attackedTeam } = data

      io.to(partyId).emit('attacking-message', {
        from: socket.id,
        payload: {
          attackingTeam,
          attackedTeam,
        },
      })
    })

    socket.on('answer-message', (data) => {
      const { partyId, teamId } = data

      io.to(partyId).emit('party-message', {
        from: socket.id,
        payload: {
          teamId,
        },
      })
    })

    socket.on('party-started', (data) => {
      const { partyId, teams } = data

      io.to(partyId).emit('party-started', {
        from: socket.id,
        payload: {
          teams,
        }
      })
    })

    socket.on('next-question', (data) => {
      const { partyId, question } = data
      io.to(partyId).emit('next-question', {
        from: socket.id,
        payload: {
          question,
        }
      })
    });

    socket.on('answering-time', (data) => {
      const { partyId, answering } = data

      io.to(partyId).emit('change-team-status', {
        from: socket.id,
        payload: {
          answering,
        }
      })
    })
  })
}
