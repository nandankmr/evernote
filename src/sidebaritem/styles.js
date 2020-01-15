const styles = theme => ({
    listItem: {
      cursor: 'pointer'
    },
    textSection: {
      width: '90%'
    },  
    deleteIcon: {
      position: 'absolute',
      right: '5px',
      top: 'calc(50% - 15px)',
      '&:hover': {
        color: 'red'
      }
    }
  });
  
  export default styles;