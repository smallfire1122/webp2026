import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import './App.css'

const API_URL =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'

const columns = [
  {
    field: 'title',
    headerName: '名稱',
    flex: 1.8,
    minWidth: 320,
  },
  {
    field: 'location',
    headerName: '地點',
    flex: 1.1,
    minWidth: 220,
  },
  {
    field: 'price',
    headerName: '票價',
    flex: 0.7,
    minWidth: 150,
  },
]

function App() {
  const [rows, setRows] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  useEffect(() => {
    let ignore = false

    async function fetchShows() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`HTTP 狀態碼：${response.status}`)
        }

        const data = await response.json()
        const mappedRows = data.map((item, index) => {
          const firstShowInfo =
            Array.isArray(item.showInfo) && item.showInfo.length > 0
              ? item.showInfo[0]
              : {}

          return {
            id: `${item.UID ?? item.title ?? 'show'}-${index}`,
            title: item.title || '無資料',
            location:
              firstShowInfo.location || firstShowInfo.locationName || '無資料',
            price: firstShowInfo.price || '免費或未提供',
          }
        })

        if (!ignore) {
          setRows(mappedRows)
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || '資料讀取失敗')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchShows()

    return () => {
      ignore = true
    }
  }, [])

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(keyword.trim().toLowerCase()),
  )

  return (
    <Box className="page-shell">
      <Container maxWidth="lg">
        <Paper className="hero-card" elevation={0}>
          <Stack spacing={3}>
            <Box className="hero-copy">
              <Typography variant="overline" className="eyebrow">
                HW5 / React DataGrid
              </Typography>
              <Typography variant="h3" component="h1" className="hero-title">
                景點觀光展覽資訊
              </Typography>
              <Typography variant="body1" className="hero-text">
                以 HW4 的資料來源改寫成 React DataGrid，並使用 useEffect
                呼叫 API 更新表格內容。
              </Typography>
            </Box>

            <TextField
              label="搜尋名稱"
              variant="outlined"
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value)
                setPaginationModel((current) => ({ ...current, page: 0 }))
              }}
              placeholder="輸入名稱關鍵字"
              className="search-field"
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              className="status-row"
            >
              <Typography variant="body2" className="status-pill">
                目前共有 {filteredRows.length} 筆符合資料
              </Typography>
              <Typography variant="body2" className="status-pill">
                API 來源: 文化部景點觀光展覽資料
              </Typography>
            </Stack>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Box className="grid-frame">
              <DataGrid
                rows={filteredRows}
                columns={columns}
                loading={loading}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'title', sort: 'asc' }],
                  },
                }}
                slots={{
                  loadingOverlay: CircularProgress,
                }}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#0e9f6e',
                    color: '#ffffff',
                    fontSize: 16,
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 700,
                  },
                  '& .MuiDataGrid-cell': {
                    alignItems: 'center',
                    whiteSpace: 'normal',
                    lineHeight: 1.4,
                    py: 1.5,
                  },
                  '& .MuiDataGrid-row:nth-of-type(odd)': {
                    backgroundColor: '#f6f7fb',
                  },
                }}
              />
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default App
