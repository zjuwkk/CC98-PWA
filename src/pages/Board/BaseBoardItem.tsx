import React from 'react'
import { IBaseBoard, IBoard } from '@cc98/api'
import { css } from 'emotion'
import BoardItem from './BoardItem'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

type Props = {
  data: IBaseBoard
}
type State = {}
const root = css`
  border-bottom: #eaeaea solid thin;
`
const BaseBoardStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  margin: 0 0 0 0;
`
const ChildBoardStyle = css`
  && {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    padding: 0 0 0 0;
  }
`
const BaseBoardContainerStyle = css`
  && {
    max-height: 30px;
    min-height: 30px;
    margin: 0 0 0 0;
  }
`
const styles = (theme: any) => ({
  root: {
    width: '100%',
  },
  expanded: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
})

export default withStyles(styles)(
  class extends React.Component<Props & { classes: any }, State> {
    render() {
      const { data, classes } = this.props
      return (
        <ExpansionPanel classes={{ expanded: classes.expanded }} defaultExpanded={true}>
          <ExpansionPanelSummary
            style={{ minHeight: '2.5rem' }}
            className={BaseBoardContainerStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={BaseBoardStyle}>{data.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={ChildBoardStyle}>
            {data.boards.map(board => (
              <BoardItem data={board} />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }
)