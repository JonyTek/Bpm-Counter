using System;
using System.Windows.Forms;

namespace Bpm.App
{
    public partial class Form1 : Form
    {
        private readonly Presenter _presenter;

        public Form1()
        {
            _presenter = new Presenter();

            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, EventArgs e)
        {
            _presenter.CalculateBpm(i => lblBpm.Text = i.ToString());
        }

        private void btnReset_Click(object sender, EventArgs e)
        {
            _presenter.ResetBpmCounter();

            lblBpm.Text = @"- - -";
        }
    }
}
