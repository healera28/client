function objectToCsv(data) {
    const csvRows = []
    
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(','))
    
    data.forEach(obj => {
      const values = Object.values(obj)
      csvRows.push(values.join(','))
    })
    
    const csvString = csvRows.join('\n')
    
    return csvString;
}

export default objectToCsv