import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import AlarmIcon from '@mui/icons-material/Alarm'

const buttonItems = [
  {
    label: 'add to shopping cart',
    icon: <AddShoppingCartIcon fontSize="large" />,
  },
  {
    label: 'delete',
    icon: <DeleteIcon fontSize="large" />,
  },
  {
    label: 'add an alarm',
    icon: <AlarmIcon fontSize="large" />,
  },
]

function MultiButton() {
  return buttonItems.map(({ label, icon }) => (
    <Tooltip key={label} title={label}>
      <IconButton
        color="primary"
        aria-label={label}
        size="large"
        className="icon-button"
      >
        {icon}
      </IconButton>
    </Tooltip>
  ))
}

export default MultiButton
