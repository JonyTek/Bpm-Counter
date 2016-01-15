using System;
using System.Collections.ObjectModel;
using System.Linq;

namespace Bpm.App
{
    public class Presenter
    {
        private DateTime _last;
        private Collection<double> _timeBetweenClicks;

        public Presenter()
        {
            ResetBpmCounter();
        }

        public void CalculateBpm(Action<int> callback)
        {
            var clickedAt = DateTime.Now;

            if (_last == DateTime.MinValue)
            {
                _last = clickedAt;
            }
            else
            {
                _timeBetweenClicks.Add((clickedAt - _last).TotalMilliseconds);

                callback((int)(1000 / _timeBetweenClicks.Average() * 60));

                _last = clickedAt;
            }

        }

        public void ResetBpmCounter()
        {
            _last = DateTime.MinValue;
            _timeBetweenClicks = new Collection<double>();
        }
    }
}